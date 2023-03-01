import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image, ListGroup } from 'react-bootstrap';
import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/CommentCard';
import { getEventComments, getSingleEvent } from '../../api/eventData';

function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEvent(firebaseKey).then(setEventDetails);
    getEventComments(firebaseKey).then(setComments);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{eventDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={eventDetails.image} alt={eventDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {eventDetails.name}
            <br />
            Location: {eventDetails.location}
            <br />
            Date: {eventDetails.date}
          </h5>
          <hr />
        </div>
      </div>
      <div><CommentForm /></div>
      <hr />
      <Head>
        <title>Comments</title>
      </Head>
      <div className="text-center my-4">
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.firebaseKey}>
              <CommentCard commentObj={comment} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default ViewEvent;
