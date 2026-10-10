'use client';

import { useEffect, useRef, useState } from 'react';
import { accentInfo, getAccent, type Accent } from '@/lib/accents';
import { getHeroFinish, onHeroFinish, type HeroFinish } from '@/lib/easter-eggs';

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Slow, domain-warped noise shaded like molten metal: the colour theme's tones in light mode, silver in dark. Output is premultiplied
// alpha so the page background shows through and the theme still decides the base.
// The cursor presses a soft dent into the surface and clicks send out a ripple; easter eggs
// can swap the finish (1 gold, 2 chrome, 3 holographic, 4 matrix), blended in by uFinishMix.
const FRAGMENT = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uDark;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform vec2 uRipple;
uniform float uRippleAge;
uniform float uFinish;
uniform float uFinishMix;
uniform vec3 uTintA;
uniform vec3 uTintB;
uniform vec3 uTintC;
uniform float uSilverTint;
uniform float uHighContrast;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

// Height added by the cursor: a dent under the pointer plus a ring travelling out from the last click
float press(vec2 uv) {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  float d = length((uv - uMouse) * aspect);
  float dent = -exp(-d * d * 70.0) * uMouseAmt * 0.22;
  float rd = length((uv - uRipple) * aspect);
  float front = rd - uRippleAge * 0.45;
  float ripple = sin(front * 55.0) * exp(-front * front * 140.0) * exp(-uRippleAge * 1.4) * 0.08;
  return dent + ripple;
}

void main() {
  vec2 p = vUv * vec2(uResolution.x / uResolution.y, 1.0) * 0.9;
  float t = uTime * 0.04;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 1.5 * t), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  vec2 w = p + 2.0 * r;
  float n = fbm(w);

  // The colour theme's three metal tones (lib/accents.ts)
  vec3 color = mix(uTintA, uTintB, clamp(length(q) * 0.9, 0.0, 1.0));
  color = mix(color, uTintC, clamp(r.x * r.x, 0.0, 1.0) * 0.35);
  // Dark theme swaps them for cool silver, with a hint of the accent
  vec3 silver = mix(vec3(0.95, 0.96, 0.98), vec3(0.62, 0.65, 0.72), clamp(length(q) * 0.9, 0.0, 1.0));
  silver = mix(silver, silver * (0.55 + 0.6 * uTintA), uSilverTint * 2.0);
  color = mix(color, silver, uDark);

  // Treat the noise as a height field and light it like polished metal. The normal
  // ignores how r changes between samples, which is close enough for a soft surface.
  float e = 0.03;
  vec2 slope = vec2(fbm(w + vec2(e, 0.0)) - n, fbm(w + vec2(0.0, e)) - n) / e;
  float ep = 0.004;
  float pressed = press(vUv);
  slope += vec2(press(vUv + vec2(ep, 0.0)) - pressed, press(vUv + vec2(0.0, ep)) - pressed) / ep * 0.5;
  vec3 normal = normalize(vec3(-slope * 0.45, 1.0));
  vec3 reflected = reflect(vec3(0.0, 0.0, -1.0), normal);
  vec3 light = normalize(vec3(0.5, 0.8, 0.9));

  // Bright studio strips sliding across the reflection give the liquid-metal sheen
  float strips = pow(0.5 + 0.5 * sin(reflected.x * 6.0 - reflected.y * 8.0 + t * 6.0), 4.0);
  float diffuse = max(dot(normal, light), 0.0);
  float specular = pow(max(dot(reflected, light), 0.0), 40.0);
  float fresnel = pow(1.0 - normal.z, 1.5);

  // Easter-egg finishes
  float lq = clamp(length(q) * 0.9, 0.0, 1.0);
  vec3 finish = color;
  if (uFinish < 1.5) finish = mix(vec3(1.0, 0.8, 0.35), vec3(0.8, 0.5, 0.12), lq);
  else if (uFinish < 2.5) finish = mix(vec3(1.0), vec3(0.4, 0.43, 0.5), lq);
  else if (uFinish < 3.5) finish = 0.6 + 0.4 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + reflected.x * 0.9 + reflected.y * 0.6 + t * 2.0));
  else finish = vec3(0.15, 1.0, 0.4) * (0.75 + 0.25 * step(0.5, fract(vUv.y * 140.0)));
  color = mix(color, finish, uFinishMix);

  vec3 metal = color * (0.25 + 0.6 * diffuse + 0.7 * strips)
    + vec3(1.0, 0.95, 0.85) * (specular * 1.1 + fresnel * 0.5);

  // Strongest toward the top-right, fading out toward the bottom and the text side
  float falloff = smoothstep(1.15, 0.1, distance(vUv, vec2(0.75, 1.0)));
  float alpha = smoothstep(0.35, 0.8, n) * falloff * mix(0.55, 0.75, uDark);
  // The dent and ripples also raise a little metal where the surface was clear
  alpha = min(alpha + abs(pressed) * 1.6 * mix(0.35, 1.0, falloff), 0.85);
  // High contrast keeps the metal faint so it never competes with the text
  alpha *= mix(1.0, 0.4, uHighContrast);
  gl_FragColor = vec4(min(metal, 1.0) * alpha, alpha);
}`;

const RENDER_SCALE = 0.5; // it's a soft gradient, so half resolution is plenty
const FRAME_INTERVAL = 1000 / 30;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/**
 * Animated gradient behind the hero. Runs at 30fps and half resolution, pauses when
 * off screen or in a background tab, draws a single still frame for reduced motion,
 * and leaves the plain CSS glow in place if WebGL isn't available.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, antialias: false });
    if (!canvas || !gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uDark = gl.getUniformLocation(program, 'uDark');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uMouseAmt = gl.getUniformLocation(program, 'uMouseAmt');
    const uRipple = gl.getUniformLocation(program, 'uRipple');
    const uRippleAge = gl.getUniformLocation(program, 'uRippleAge');
    const uFinish = gl.getUniformLocation(program, 'uFinish');
    const uFinishMix = gl.getUniformLocation(program, 'uFinishMix');
    const uTints = ['uTintA', 'uTintB', 'uTintC'].map((name) => gl.getUniformLocation(program, name));
    const uSilverTint = gl.getUniformLocation(program, 'uSilverTint');
    const uHighContrast = gl.getUniformLocation(program, 'uHighContrast');
    const applyAccentColours = (accent: Accent) => {
      const { metal, silverTint } = accentInfo(accent);
      metal.forEach((rgb, i) => gl.uniform3f(uTints[i], ...rgb));
      gl.uniform1f(uSilverTint, silverTint);
    };
    applyAccentColours(getAccent());

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Start partway in so the still frame for reduced motion isn't the plain initial state
    const start = performance.now() - 20_000;
    let frame = 0;
    let last = 0;
    let visible = true;

    // Pointer state in canvas UV space (0–1, y up). Eased toward the targets every frame.
    const mouse = { x: 0.5, y: 0.5, amt: 0, targetX: 0.5, targetY: 0.5, targetAmt: 0 };
    const ripple = { x: 0.5, y: 0.5, at: -Infinity };
    // Finishes fade out to the default before the next one fades in
    const finishCodes: Record<HeroFinish, number> = { default: 0, gold: 1, chrome: 2, holo: 3, matrix: 4 };
    const finish = { code: finishCodes[getHeroFinish()], next: getHeroFinish(), mix: getHeroFinish() === 'default' ? 0 : 1 };

    const step = (now: number) => {
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;
      mouse.amt += (mouse.targetAmt - mouse.amt) * 0.12;
      const wantsCode = finishCodes[finish.next];
      if (finish.code !== wantsCode && finish.mix > 0.01) finish.mix = Math.max(0, finish.mix - 0.08);
      else {
        finish.code = wantsCode;
        finish.mix += ((wantsCode ? 1 : 0) - finish.mix) * 0.08;
      }
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseAmt, mouse.amt);
      gl.uniform2f(uRipple, ripple.x, ripple.y);
      // Capped so an old (or never-made) ripple stays a small finite number on mediump GPUs
      gl.uniform1f(uRippleAge, Math.min((now - ripple.at) / 1000, 10));
      gl.uniform1f(uFinish, finish.code);
      gl.uniform1f(uFinishMix, finish.mix);
    };

    const draw = (now: number) => {
      step(now);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uDark, root.classList.contains('dark') ? 1 : 0);
      gl.uniform1f(uHighContrast, root.dataset.contrast === 'high' ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      draw(performance.now());
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_INTERVAL) return;
      last = now;
      draw(now);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reduceMotion.matches) frame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    intersectionObserver.observe(canvas);
    // Redraw on theme and colour changes, which matters while paused
    const themeObserver = new MutationObserver(() => {
      applyAccentColours(getAccent());
      draw(performance.now());
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class', 'data-accent', 'data-contrast'] });
    document.addEventListener('visibilitychange', update);
    reduceMotion.addEventListener('change', update);

    // Fall back to the CSS glow if the GPU drops the context
    const onContextLost = () => {
      cancelAnimationFrame(frame);
      setReady(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    // Mouse only: touch scrolling shouldn't dent the metal, and reduced motion keeps it still
    const section = canvas.parentElement!;
    const toUv = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: (e.clientX - rect.left) / rect.width, y: 1 - (e.clientY - rect.top) / rect.height };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || reduceMotion.matches) return;
      const uv = toUv(e);
      mouse.targetX = uv.x;
      mouse.targetY = uv.y;
      if (!mouse.targetAmt) {
        // Appear where the cursor enters instead of sliding in from the last spot
        mouse.x = uv.x;
        mouse.y = uv.y;
      }
      mouse.targetAmt = 1;
    };
    const onPointerLeave = () => {
      mouse.targetAmt = 0;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || reduceMotion.matches) return;
      const uv = toUv(e);
      ripple.x = uv.x;
      ripple.y = uv.y;
      ripple.at = performance.now();
    };
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    section.addEventListener('pointerdown', onPointerDown);

    const offFinish = onHeroFinish((next) => {
      finish.next = next;
      // When paused there's no loop to ease it in, so jump straight to it
      if (reduceMotion.matches) {
        finish.code = finishCodes[next];
        finish.mix = next === 'default' ? 0 : 1;
        draw(performance.now());
      }
    });

    resize();
    update();
    setReady(true);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      section.removeEventListener('pointerdown', onPointerDown);
      offFinish();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', update);
      reduceMotion.removeEventListener('change', update);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      // Don't lose the context here: a canvas hands back the same context on the next
      // getContext call, so a remount (Strict Mode, fast refresh) would get a dead one
      setReady(false);
    };
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-foreground/10 transition-opacity duration-1000 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-1000 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
