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

function CommentForm({ obj, onUpdate }) {
  // Setting up a state for the form input with an initial value of an empty string
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();// Initializing the useRouter hook
  const { firebaseKey } = router.query;// Extracting the firebaseKey from the router query object
  const { user } = useAuth();// Initializing the useAuth hook

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => { // The handleChange function is called when a change is made to the input field
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { // The handleSubmit function is called when the form is submitted
    e.preventDefault();
    if (obj?.firebaseKey) {
      updateComment(formInput) // If the comment already exists (has a firebaseKey), the updateComment function is called with the updated formInput
        .then(() => {
          router.push(`/event/${obj.eventId}`);
        });
    } else {
      const payload = { ...formInput, uid: user.uid, eventId: firebaseKey };// If the comment doesn't exist yet, a new payload is created with the formInput, the user's uid, and the eventId
      createComment(payload).then(({ name }) => { // The createComment function is called with the payload, and the returned object's name property is extracted
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload).then(() => { // The updateComment function is called again with a new payload containing the name property of the returned object
          onUpdate();
          router.push(`/event/${firebaseKey}`); // The user is redirected to the event page
          setFormInput(initialState); // The form input is reset to its initial state
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

CommentForm.propTypes = {
  obj: PropTypes.shape({
    comment: PropTypes.string,
    firebaseKey: PropTypes.string,
    eventId: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  firebaseKey: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
