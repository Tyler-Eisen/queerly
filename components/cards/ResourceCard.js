/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useAuth } from '../../utils/context/authContext';
import { deleteSingleResource, getSingleResource } from '../../api/resourceData';

function ResourceCard({ resourceObj, onUpdate }) {
  // Using the useAuth hook to get the current user
  const { user } = useAuth();
  /* Defining a state variable resourceDetails using the useState hook */
  const [resourceDetails, setResourceDetails] = useState({});
  /* Using the useRouter hook to get the current router object */
  const router = useRouter();
  /* Extracting the firebaseKey parameter from the router query object */
  const { firebaseKey } = router.query;

  /* Defining a useEffect hook to load the resource details when the component mounts or when the resourceObj or firebaseKey props change */
  useEffect(() => {
    getSingleResource(resourceObj.firebaseKey).then(setResourceDetails);
  }, [resourceObj, firebaseKey]);

  /* Checking if the current user is the author of the resource */
  const isCurrentUserResource = user && user.uid === resourceObj.uid;

  const deleteThisResource = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      /* Deleting the resource using the deleteSingleResource function and updating the resource list */
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
