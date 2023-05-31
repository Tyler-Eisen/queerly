import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createEvent, updateEvent } from '../../../api/eventData';
import { useAuth } from '../../../utils/context/authContext';

const initialState = {
  name: '',
  date: '',
  location: '',
  price: '',
  firebaseKey: '',
  image: '',
};

const priceOptions = [
  'Free',
  '$10-$50',
  '$50-$100',
  '> $100',
];

function EventForm({ obj }) { // Setting up a state for the form input with an initial value of an empty string
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter(); // Initializing the useRouter hook
  const { user } = useAuth(); // Initializing the useAuth hook

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updateEvent(formInput) // If the Event already exists (has a firebaseKey), the updateEvent function is called with the updated formInput
        .then(() => router.push('/event/event'));
    } else {
      const payload = { ...formInput, uid: user.uid };// If the Event doesn't exist yet, a new payload is created with the formInput, and the user's uid
      createEvent(payload).then(({ name }) => { // The createEvent function is called with the payload, and the returned object's name property is extracted
        const patchPayload = { firebaseKey: name };
        updateEvent(patchPayload).then(() => { // The updateEvent function is called again with a new payload containing the name property of the returned object
          router.push('/event/event'); // The user is redirected to the event page
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
          type="date"
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
        <Form.Select
          label="Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
        >
          <option value="">Select a price range</option>
          {priceOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="floatingInput2" label="Book Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'}  Event</Button>
    </Form>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    event: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
