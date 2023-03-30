/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <div className="container">
      <Head>
        <title>queerly</title>
      </Head>
      <div className="logo-container">
        <img src="/images/queerly-main2.png" alt="queerly logo" />
        <h1>Hi Gay! Welcome To queerly. </h1>
        <h2>What are you interested in today?</h2>
      </div>
      <div className="button-container">
        <h2><b>Events</b></h2>
        <h4>Click here to learn more about LGBTQ+ events taking place in your area!</h4>
        <Link passHref href="/event/event">
          <button type="button" className="btn">Events</button>
        </Link>
        <p />
        <h2><b>Resources</b></h2>
        <h4>Click here to learn more about local mental health resources available to members of the LGBTQ+ community</h4>
        <Link passHref href="/resource/resource">
          <button className="btn" type="button">
            Resources
          </button>
        </Link>
        <p />
        <h2><b>Media</b></h2>
        <h4>Click here to find out what books, podcasts, films, and other LGBTQ+ media other users are talking about</h4>
        <Link passHref href="/media/media">
          <button className="btn" type="button">
            Media
          </button>
        </Link>
      </div>
      <style>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 90vh;
          padding: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 33%;
          padding-right: 20px;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 66%;
          padding-left: 20px;
        }

        .logo-container img {
          max-width: 100%;
        }

        h1,
        h2 {
          margin: 0;
        }

        .btn {
          margin-bottom: 20px;
        }
      `}
      </style>
    </div>
  );
}

export default Home;
