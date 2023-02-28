import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image, ListGroup } from 'react-bootstrap';

import CommentForm from '../../components/forms/CommentForm';
import CommentCard from '../../components/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import { viewEventDetails } from '../../api/eventData';
import { getComments } from '../../api/commentData';

function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllTheComments = () => {
    getComments(user.uid, firebaseKey).then(setComments);
  };

  useEffect(() => {
    viewEventDetails(firebaseKey).then(setEventDetails);
    getAllTheComments([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  console.warn('comments:', comments);

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
