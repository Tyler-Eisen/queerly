import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getResources } from '../../api/resourceData'; // updated import
import { useAuth } from '../../utils/context/authContext';
import ResourceCard from '../../components/ResourceCard'; // updated import

export default function ResourcePage() { // updated function name
  const [resources, setResources] = useState([]); // updated state variable name

  const { user } = useAuth();

  const getAllTheResources = () => {
    getResources(user.uid).then(setResources); // updated function name
  };

  useEffect(() => {
    getAllTheResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.warn(resources);

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/resource/new" passHref>
          <Button>Add A Resource</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {resources.map((resource) => (
            <ResourceCard key={resource.firebaseKey} resourceObj={resource} onUpdate={getAllTheResources} /> // updated variable name
          ))}
        </div>
      </div>
    </>
  );
}
