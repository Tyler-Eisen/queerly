import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getResources } from '../../api/resourceData';
import { useAuth } from '../../utils/context/authContext';
import ResourceCard from '../../components/ResourceCard';

export default function ResourcePage() {
  const [resources, setResources] = useState([]);

  const { user } = useAuth();

  const getAllTheResources = () => {
    getResources(user.uid).then(setResources);
  };

  useEffect(() => {
    getAllTheResources();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <ResourceCard key={resource.firebaseKey} resourceObj={resource} onUpdate={getAllTheResources} />
          ))}
        </div>
      </div>
    </>
  );
}
