import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSingleEvent, getSingleEvent } from '../api/eventData';

function EventCard({ eventObj, onUpdate }) {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter;
  const { firebaseKey } = router().query;

  useEffect(() => {
    getSingleEvent(eventObj.firebaseKey).then(setEventDetails);
  }, [eventObj, firebaseKey]);

  const deleteThisEvent = () => {
    if (window.confirm('Sure you want to elete this event?')) {
      deleteSingleEvent(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Card style={{
        width: '18rem', marginLeft: '10px', marginRight: '10px', marginTop: '35px',
      }}
      >
        <Link href={`/event/${eventObj.firebaseKey}`} passHref>
          <Card.Header className="event-card-header" style={{ cursor: 'pointer' }}>{eventDetails.name}</Card.Header>
        </Link>
        <ListGroup variant="flush">
          <ListGroup.Item>{eventObj.date}</ListGroup.Item>
          <ListGroup.Item>{eventObj.location}</ListGroup.Item>
          <ListGroup.Item>{eventObj.name}</ListGroup.Item>
          <ListGroup.Item>{eventObj.type}</ListGroup.Item>
        </ListGroup>
        <Link href={`/event/edit/${eventObj.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
};

export default EventCard;
