import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { deleteSingleResource, getSingleResource } from '../api/resourceData';

function ResourceCard({ resourceObj, onUpdate }) {
  const [resourceDetails, setResourceDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleResource(resourceObj.firebaseKey).then(setResourceDetails);
  }, [resourceObj, firebaseKey]);

  const deleteThisResource = () => {
    if (window.confirm('Delete this resource?')) {
      deleteSingleResource(resourceObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Card style={{
        width: '18rem', marginLeft: '10px', marginRight: '10px', marginTop: '35px',
      }}
      >
        <Link href={`/resource/${resourceObj.firebaseKey}`} passHref>
          <Card.Header className="card-header-custom" style={{ cursor: 'pointer' }}>{resourceDetails.name}</Card.Header>
        </Link>
        <ListGroup variant="flush">
          <ListGroup.Item>{resourceObj.price}</ListGroup.Item>
          <ListGroup.Item>{resourceObj.location}</ListGroup.Item>
          <ListGroup.Item>{resourceObj.name}</ListGroup.Item>
          <ListGroup.Item>{resourceObj.type}</ListGroup.Item>
        </ListGroup>
        <Link href={`/resource/edit/${resourceObj.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisResource} className="m-2">
          DELETE
        </Button>
      </Card>
    </>
  );
}

ResourceCard.propTypes = {
  resourceObj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ResourceCard;
