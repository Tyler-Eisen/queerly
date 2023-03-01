import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSingleComment } from '../api/commentData';

function CommentCard({ commentObj }) {
  const [commentDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // useEffect(() => {
  //   getSingleComment(firebaseKey).then(setCommentDetails);
  // }, [firebaseKey]);

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteSingleComment(commentDetails.firebaseKey).then(() => {
        router.push(`/post/${firebaseKey}`);
      });
    }
  };
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
};
export default CommentCard;
