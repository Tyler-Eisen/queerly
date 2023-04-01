import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../../utils/context/authContext';
import { createMedia, updateMedia } from '../../../api/mediaData';

const initialState = {
  name: '',
  type: '',
  details: '',
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

const typeOptions = [
  'Podcast',
  'Tv-show',
  'Film',
  'Book',
  'Other',
];

function MediaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateMedia(formInput)
        .then(() => router.push('/media/media'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMedia(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedia(patchPayload).then(() => {
          router.push('/media/media');
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
          placeholder="What's this event called?"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>details</Form.Label>
        <Form.Control
          label="details"
          type="text"
          placeholder="Tell us something about your recommendation."
          name="details"
          value={formInput.details}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Type</Form.Label>
        <Form.Select
          label="Type"
          type="type"
          placeholder="What kind of media is this?"
          name="type"
          value={formInput.date}
          onChange={handleChange}
          required
        >
          <option value="">Select a media type</option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Form.Select>

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
      {/* IMAGE INPUT  */}
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'}  Recommendation</Button>
    </Form>
  );
}

MediaForm.propTypes = {
  obj: PropTypes.shape({
    event: PropTypes.string,
    date: PropTypes.string,
    details: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MediaForm.defaultProps = {
  obj: initialState,
};

export default MediaForm;
