import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSingleComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();

  const isCurrentUserComment = user && user.uid === commentObj.uid;

  const deleteThisComment = () => {
    if (window.confirm('Sure you want to delete this comment?')) {
      deleteSingleComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  if (!commentObj) {
    return null;
  }

  return (
    <div key={commentObj.firebaseKey} className="mb-3">
      {isCurrentUserComment ? (
        <div className="d-flex justify-content-between">
          <div>
            {commentObj.comment}
          </div>
          <div>
            <Link href={`/comment/edit/${commentObj.firebaseKey}`} passHref><Button>Edit</Button></Link>
            <Button onClick={deleteThisComment}>DELETE</Button>
          </div>
        </div>
      ) : commentObj.comment}
      <hr />
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    comment: PropTypes.string,
    eventId: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
