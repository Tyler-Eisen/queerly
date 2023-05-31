/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleEvent } from '../api/eventData';
import { deleteEventComments } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function EventCard({ eventObj, onUpdate }) {
  // Using the useAuth hook to get the current user
  const { user } = useAuth();
  /* Defining a state variable eventDetails using the useState hook */
  const [eventDetails, setEventDetails] = useState({});
  /* Using the useRouter hook to get the current router object */
  const router = useRouter();
  /* Extracting the firebaseKey parameter from the router query object */
  const { firebaseKey } = router.query;

  // Fetch the details of the event using the getSingleEvent API when the component mounts or when eventObj or firebaseKey changes
  useEffect(() => {
    getSingleEvent(eventObj?.firebaseKey).then(setEventDetails);
  }, [eventObj, firebaseKey]);

  /* Checking if the current user is the author of the event */
  const isCurrentUserEvent = user && user.uid === eventObj?.uid;

  const deleteThisEvent = () => {
    if (window.confirm('Sure you want to delete this event?')) {
      /* Deleting the event using the deleteSingleEvent function and updating the event list */
      deleteEventComments(eventObj?.firebaseKey).then(() => onUpdate());
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
        <title>Events</title>
      </Head>
      <Card style={cardStyles}>
        <img src={eventDetails?.image} alt={eventDetails?.name} style={cardImageStyles} />
        <div>
          <Link href={`/event/${eventObj?.firebaseKey}`} passHref>
            <h3 style={{ cursor: 'pointer' }}>{eventDetails?.name}</h3>
          </Link>
          <p>{eventObj?.date}</p>
          <p>{eventObj?.location}</p>
          <p>{eventObj?.type}</p>
          {isCurrentUserEvent ? (
            <>
              <Link href={`/event/edit/${eventObj.firebaseKey}`} passHref>
                <Button size="sm" className="m-2">
                  EDIT
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={deleteThisEvent} className="m-2">
                DELETE
              </Button>
            </>
          ) : null}
        </div>
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
