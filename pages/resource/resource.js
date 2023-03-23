import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
      <div className="d-flex" style={{ fontSize: '1.8rem', height: 'calc(100vh - 4rem)' }}>
        <div className="summary-container col-md-4 p-4" style={{ height: '100%', overflowY: 'auto' }}>
          <h2 style={{ fontWeight: 'bold' }}>queerly Resources</h2>
          <p style={{ lineHeight: '1.5' }}>While being LGBTQ+ is not a mental illness, many individuals who identify as Queer face mental health challenges. Despite these challenges, most LGBTQ+ individuals exhibit incredible resilience and can thrive when surrounded by supportive families, communities, and peers. Here we have included a list of mental health resources to help you navigate the emotionally complex experience of living as as a queer person in the South</p>
          <div className="text-center my-4">
            <Link href="/resource/new" passHref>
              <Button>Add A Resource</Button>
            </Link>
          </div>
        </div>
        <div className="card-container col-md-8 p-4" style={{ fontSize: '1rem', height: '100%', overflowY: 'auto' }}>
          <Row className="justify-content-center">
            {resources.map((resource) => (
              <Col key={resource.firebaseKey} md={6} className="mb-4">
                <ResourceCard resourceObj={resource} onUpdate={getAllTheResources} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
