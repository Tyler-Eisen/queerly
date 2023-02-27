import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createEvent, updateEvent } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  date: '',
  location: '',
  price: '',
  firebaseKey: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getEvents(user).then(setEvents);
    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updateEvent(formInput)
        .then(() => router.push('/event/event'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvent(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEvent(patchPayload).then(() => {
          router.push('/event/event');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '65px' }}>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          label="Name"
          type="text"
          placeholder="What's this event called?."
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Date</Form.Label>
        <Form.Control
          label="Date"
          type="text"
          placeholder="When is this event taking place?"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Location</Form.Label>
        <Form.Control
          label="Location"
          type="text"
          placeholder="Where is this event taking place?"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Price</Form.Label>
        <Form.Control
          label="Price"
          type="text"
          placeholder="Please list the price if applicable."
          name="price"
          value={formInput.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} An Event</Button>
    </Form>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    event: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
