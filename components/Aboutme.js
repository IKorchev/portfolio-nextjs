import { SectionTitle } from "./SectionTitle"

export const Aboutme = () => {
  return (
    <div id='about'>
      <SectionTitle name='about me' />
      <div className='container mx-auto p-5  text-white font-mono' id='aboutme'>
        <div className='font-normal w-full py-5 mx-auto lg:w-1/2 text-xl flex justify-center py-5 flex-col'>
          <p className='font-sans'>
            My name is Ivaylo and I am a passionate Web Developer based in London. I
            believe in learning by building! I love to build projects and improve with
            each one of them. As you can see I have experience building projects with lots
            of up-to-date technologies such as HTML CSS JS React and more.
          </p>
          <p className='mt-5 font-sans'>
            Recently I have been using Next.js and TailwindCSS to build personal projects
            and I feel like this combination is very powerful.
          </p>
          <p className='mt-5 font-sans'>
            If you would like to work with me, don't hesitate to contact me by filling the
            form below or connect with me on LinkedIn.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Aboutme
