import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createResource, updateResource } from '../../api/resourceData';

const initialState = {
  name: '',
  type: '',
  location: '',
  price: '',
  firebaseKey: '',
};

function ResourceForm({ obj }) {
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
      updateResource(formInput)
        .then(() => router.push('/resource/resource'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createResource(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateResource(patchPayload).then(() => {
          router.push('/resource/resource');
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
          placeholder="What's this resource called?."
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Location</Form.Label>
        <Form.Control
          label="location"
          type="text"
          placeholder="When is this resource available?"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Type</Form.Label>
        <Form.Control
          label="Type"
          type="text"
          placeholder="Is this resource in person, online, or both?"
          name="type"
          value={formInput.type}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatinginput1">
        <Form.Label>Price</Form.Label>
        <Form.Control
          label="Price"
          type="text"
          placeholder="Please list the price range."
          name="price"
          value={formInput.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">{obj.firebaseKey ? 'Uplocation' : 'Create'} An resource</Button>
    </Form>
  );
}

ResourceForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ResourceForm.defaultProps = {
  obj: initialState,
};

export default ResourceForm;
