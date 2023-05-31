// Import client credentials from utils
import { clientCredentials } from '../utils/client';

// Set the endpoint for API calls
const endpoint = clientCredentials.databaseURL;

// GET ALL EVENTS
const getEvents = () => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all events
  fetch(`${endpoint}/events.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // If there are events, resolve with an array of event objects
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE EVENT
const createEvent = (payload) => new Promise((resolve, reject) => {
  // Make a POST request to create a new event
  fetch(`${endpoint}/events.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE EVENT
const getSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single event by its firebase key
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE EVENT
const deleteSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a DELETE request to delete a single event by its firebase key
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// UPDATE EVENT
const updateEvent = (payload) => new Promise((resolve, reject) => {
  // Make a PATCH request to update an existing event
  fetch(`${endpoint}/events/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getEventComments = (eventId) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all event comments for a specific event ID
  fetch(`${endpoint}/comments.json?orderBy="eventId"&equalTo="${eventId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const viewEventDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve event details for a specific firebase key
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getEvents,
  createEvent,
  getSingleEvent,
  deleteSingleEvent,
  updateEvent,
  getEventComments,
  viewEventDetails,
};
