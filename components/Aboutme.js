import {SectionTitle} from "./SectionTitle"

export const Aboutme = () => {
  return (
    <div className='container mx-auto p-5 mt-12 text-white font-mono' id='aboutme'>
      <SectionTitle name='about me' />
      <div className='flex justify-between  py-5 flex-col-reverse'>
        <p className='font-normal w-1/2 text-xl'>
          My name is Ivaylo and I am a passionate Web Developer based in London. I believe
          in learning by building! I love to build projects and improve with each one of
          them. As you can see I have experience building projects with lots of up-to-date
          technologies.
        </p>
      </div>
    </div>
  )
}
export default Aboutme
