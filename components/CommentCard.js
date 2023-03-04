import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSingleComment } from '../api/commentData';

function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Sure you want to delete this comment?')) {
      deleteSingleComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  if (!commentObj) {
    return null;
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{commentObj.comment}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{commentObj.eventId}</ListGroup.Item>
      </ListGroup>
      <Link href={`/comment/edit/${commentObj.firebaseKey}`} passHref>
        <Button variant="info" className="m-2">EDIT</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisComment} className="m-2">DELETE</Button>
    </Card>
  );
}
CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    comment: PropTypes.string,
    eventId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default CommentCard;
