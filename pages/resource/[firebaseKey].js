import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { viewResourceDetails } from '../../api/resourceData';

function ViewResource() {
  const [resourceDetails, setResourceDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewResourceDetails(firebaseKey).then(setResourceDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Resource Details</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={resourceDetails.image} alt={resourceDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {resourceDetails.name}
            <br />
            Location: {resourceDetails.location}
            <br />
            Type: {resourceDetails.type}
            <br />
            Price: {resourceDetails.price}
          </h5>
          <hr />
        </div>
      </div>
      <hr />
      <Head>
        <title>Comments</title>
      </Head>
    </>
  );
}

export default ViewResource;
