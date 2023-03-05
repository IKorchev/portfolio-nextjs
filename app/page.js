import contentfulClient from '../utils/contentfulClient';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Footer/Contact';
import FloatingSocials from '../components/FloatingSocials';
import Aboutme from '../components/About/Aboutme';
import Navbar from '../components/Navbar/Navbar';
import GithubLinks from '../components/Footer/GithubLinks';
import LandingSection from '../components/LandingSection';
import GTM from '../components/GTM';
import { Suspense } from 'react';

// async function getGithubData() {
//   return fetch('https://api.github.com/users/ikorchev/repos', {
//     cache: 'no-cache',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
//     },
//   }).then((res) => res.text());
// }
async function getContentfulData() {
  try {
    const data = await contentfulClient.getEntries(process.env.CONTENTFUL_API_KEY);
    return data.items.map((el) => el.fields).filter((el) => !el.drawing);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default async function Page() {
  const contentfulData = getContentfulData();
  return (
    <div className='bg-customdarkgray main-content'>
      <GTM />
      <div class='bg-[url(/bg.svg)] bg-no-repeat bg-center bg-cover'>
        <Navbar />
        <Suspense fallback='<div>Loading...</div>'>
          <LandingSection data={await contentfulData} />
        </Suspense>
      </div>
      <FloatingSocials />
      <Suspense fallback='<div>Loading...</div>'>
        <Projects data={await contentfulData} />
      </Suspense>
      <Aboutme />
      <Suspense fallback='<div>Loading...</div>'>{/* <GithubLinks repos={await data} /> */}</Suspense>
      <Contact />
    </div>
  );
}
