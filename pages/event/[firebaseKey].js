import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { viewEventDetails } from '../../api/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewEventDetails(firebaseKey).then(setEventDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{eventDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={eventDetails.image} alt={eventDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {eventDetails.name}
            <br />
            Location: {eventDetails.location}
            <br />
            Date: {eventDetails.date}
          </h5>
          <hr />
        </div>
      </div>
      <hr />
    </>
  );
}
