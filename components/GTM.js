'use client';
import { useEffect } from 'react';

const GTM = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-PN5KZWJSDX');
  }, []);
  return (
    <script async src='https://www.googletagmanager.com/gtag/js?id=G-PN5KZWJSDX'></script>
  );
};

export default GTM;
