// Import client credentials from utils
import { clientCredentials } from '../utils/client';

// Set the endpoint for API calls
const endpoint = clientCredentials.databaseURL;

// GET ALL COMMENTS
const getComments = (eventId) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all comments for a specific event ID
  fetch(`${endpoint}/comments.json?orderBy="eventId"&equalTo="${eventId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
    // If there are comments, resolve with an array of comment objects

      if (data) {
        resolve(Object.values(data));
      } else {
        // If there are no comments, resolve with an empty array
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE COMMENT
const createComment = (payload) => new Promise((resolve, reject) => {
  // Make a POST request to create a new comment
  fetch(`${endpoint}/comments.json`, {
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

// GET SINGLE COMMENT
const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single comment by its firebase key
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE COMMENT
const deleteSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a DELETE request to delete a single comment by its firebase key
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// UPDATE COMMENT
const updateComment = (payload) => new Promise((resolve, reject) => {
  // Make a PATCH request to update an existing comment
  fetch(`${endpoint}/comments/${payload.firebaseKey}.json`, {
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

export {
  getComments,
  createComment,
  getSingleComment,
  deleteSingleComment,
  updateComment,
};
