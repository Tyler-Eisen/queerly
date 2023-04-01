/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { getSingleMedia } from '../api/mediaData';
import { useAuth } from '../utils/context/authContext';
import { deleteMediaComments } from '../api/mergedData';

function MediaCard({ mediaObj, onUpdate }) {
  const { user } = useAuth();
  const [mediaDetails, setmediaDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMedia(mediaObj.firebaseKey).then(setmediaDetails);
  }, [mediaObj, firebaseKey]);

  const isCurrentUserMedia = user && user.uid === mediaObj.uid;

  const deleteThisMedia = () => {
    if (window.confirm('Are you sure you want to delete this piece of Media?')) {
      deleteMediaComments(mediaObj.firebaseKey).then(() => onUpdate());
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
        <title>Media</title>
      </Head>
      <Card style={cardStyles}>
        <img src={mediaDetails?.image} alt={mediaDetails?.name} style={cardImageStyles} />
        <div>
          <Link href={`/media/${mediaObj.firebaseKey}`} passHref>
            <h3 style={{ cursor: 'pointer' }}>{mediaDetails.name}</h3>
          </Link>
          <p>{mediaObj.name}</p>
          <p>{mediaObj.type}</p>
          <p>{mediaObj.details}</p>
          <p>{mediaObj.price}</p>
          {isCurrentUserMedia ? (
            <>
              <Link href={`/media/edit/${mediaObj.firebaseKey}`} passHref>
                <Button size="sm" className="m-2">
                  EDIT
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={deleteThisMedia} className="m-2">
                DELETE
              </Button>
            </>
          ) : null}
        </div>
      </Card>
    </>
  );
}

MediaCard.propTypes = {
  mediaObj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MediaCard;
