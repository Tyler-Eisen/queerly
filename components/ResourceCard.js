/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleResource, deleteSingleResource } from '../api/resourceData';
import { useAuth } from '../utils/context/authContext';

function ResourceCard({ resourceObj, onUpdate }) {
  const { user } = useAuth();
  const [resourceDetails, setResourceDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleResource(resourceObj.firebaseKey).then(setResourceDetails);
  }, [resourceObj, firebaseKey]);

  const isCurrentUserResource = user && user.uid === resourceObj.uid;

  const deleteThisResource = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteSingleResource(resourceObj.firebaseKey).then(() => onUpdate());
    }
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    margin: '10px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const cardImageStyles = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginRight: '20px',
  };

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Card style={cardStyles}>
        <img src={resourceDetails.image} alt={resourceDetails.name} style={cardImageStyles} />
        <div>
          <Link href={`/resource/${resourceObj.firebaseKey}`} passHref>
            <h3 style={{ cursor: 'pointer' }}>{resourceDetails.name}</h3>
          </Link>
          <p>{resourceObj.price}</p>
          <p>{resourceObj.location}</p>
          <p>{resourceObj.name}</p>
          <p>{resourceObj.type}</p>
          {isCurrentUserResource ? (
            <>
              <Link href={`/resource/edit/${resourceObj.firebaseKey}`} passHref>
                <Button size="sm" className="m-2">
                  EDIT
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={deleteThisResource} className="m-2">
                DELETE
              </Button>
            </>
          ) : null}
        </div>
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ResourceCard;
