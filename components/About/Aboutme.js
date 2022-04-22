import { SectionTitle } from "../SectionTitle"

export const Aboutme = () => {
  return (
    <div id='about'>
      <SectionTitle name='about me' />
      <div
        className='container max-w-7xl mx-auto p-5 xl:p-0  text-white font-mono'
        id='aboutme'>
        <div className='font-normal w-full  text-xl flex justify-center py-5 flex-col'>
          <p className='font-sans'>
            My name is Ivaylo and I am a Web Developer based in London. I have experience
            building projects with lots of up-to-date technologies such as HTML CSS JS React
            Next.js TailwindCSS and more.
          </p>
          <p className='mt-5 font-sans'>
            Also I have been exploring the Web3 space and building on the blockchain.
          </p>
          <p className='mt-5 font-sans'>
            If you would like to work with me, don't hesitate to contact me by filling the form
            below or connect with me on LinkedIn.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Aboutme
