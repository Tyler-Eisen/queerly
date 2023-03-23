import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useAuth } from '../../../utils/context/authContext';
import { createComment, updateComment } from '../../../api/commentData';

const initialState = {
  comment: '',
};

function MediaCommentForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.firebaseKey) {
      updateComment(formInput)
        .then(() => router.push(`/media/${obj.mediaId}`));
    } else {
      const payload = { ...formInput, uid: user.uid, mediaId: firebaseKey };
      createComment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, mediaId: firebaseKey };
        updateComment(patchPayload).then(() => {
          onUpdate();
          router.push(`/media/${firebaseKey}`);
          setFormInput(initialState);
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Comment Form</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="floatinginput1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            label="Comment"
            type="text"
            placeholder="Type your comment here"
            name="comment"
            value={formInput.comment}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Comment</Button>
      </Form>
    </>
  );
}

MediaCommentForm.propTypes = {
  obj: PropTypes.shape({
    comment: PropTypes.string,
    firebaseKey: PropTypes.string,
    mediaId: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  firebaseKey: PropTypes.string.isRequired,
};

MediaCommentForm.defaultProps = {
  obj: initialState,
};

export default MediaCommentForm;
