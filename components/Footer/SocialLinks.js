import {
  BsLinkedin as Linkedin,
  BsGithub as Github,
  BsMailbox as Email,
} from 'react-icons/bs';
const SocialLinks = () => {
  <div className='max-w-[35rem] w-full p-3 xl:px-24 mx-auto'>
    <h3 className='text-3xl text-center xl:text-left'>Connect with me</h3>
    <div className='flex justify-evenly xl:justify-start xl:flex-col  gap-5 mt-8 '>
      <a href='https://linkedin.com/in/ivaylo-korchev/' target='_blank' rel='noreferrer'>
        <Linkedin width={10} height={10} /> LinkedIn
      </a>
      <a href='https://github.com/ikorchev/' target='_blank' rel='noreferrer'>
        <Github width={10} height={10} className='' /> GitHub
      </a>
      <a href='mailto:korchev94@gmail.com' target='_blank' rel='noreferrer'>
        <Email width={10} height={10} /> Send me an email
      </a>
    </div>
  </div>;
};

export default SocialLinks;
