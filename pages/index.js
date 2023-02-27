/* eslint-disable react/button-has-type */
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
// import { Button } from 'bootstrap';

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
      <Link passHref href="/event">
        <button className="btn"> Events</button>
      </Link>
      <p />
      <button className="btn" type="button">
        Resources
      </button>
    </div>
  );
}

export default Home;
