/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Head>
        <title>queerly</title>
      </Head>
      <img src="/images/queerly-main2.png" alt="queerly logo" />
      <h1>Hi Gay! Welcome To queerly. </h1>
      <h2>What are you interested in today?</h2>
      <Link passHref href="/event/event">
        <button type="button" className="btn"> Events</button>
      </Link>
      <p />
      <Link passHref href="/resource/resource">
        <button className="btn" type="button">
          Resources
        </button>
      </Link>
      <p />
      <Link passHref href="/media/media">
        <button className="btn" type="button">
          Media
        </button>
      </Link>
    </div>
  );
}

export default Home;
