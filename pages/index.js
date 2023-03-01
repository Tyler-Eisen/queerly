import Link from 'next/link';

function Home() {
  // const { user } = useAuth();

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
      <h1>Hi Gay! Welcome To Queerly. </h1>
      <p><h2>What are you interested in today?</h2></p>
      <Link passHref href="/event/event">
        <button type="button" className="btn"> Events</button>
      </Link>
      <p />
      <Link passHref href="/resource/resource">
        <button className="btn" type="button">
          Resources
        </button>
      </Link>
    </div>
  );
}

export default Home;
