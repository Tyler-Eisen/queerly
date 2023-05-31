// Import client credentials from utils
import { clientCredentials } from '../utils/client';

// Set the endpoint for API calls
const endpoint = clientCredentials.databaseURL;

// GET ALL MEDIA
const getMedia = () => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all media for a specific event ID
  fetch(`${endpoint}/media.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // If there is media, resolve with an array of media objects
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE MEDIA
const createMedia = (payload) => new Promise((resolve, reject) => {
  // Make a POST request to create a new media recomendation
  fetch(`${endpoint}/media.json`, {
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

// GET SINGLE Media
const getSingleMedia = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single media by its firebase key
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE Media
const deleteSingleMedia = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a DELETE request to delete a single media by its firebase key
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// UPDATE Media
const updateMedia = (payload) => new Promise((resolve, reject) => {
  // Make a PATCH request to update an existing media
  fetch(`${endpoint}/media/${payload.firebaseKey}.json`, {
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

const getMediaComments = (mediaId) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all media comments for a specific media ID
  fetch(`${endpoint}/comments.json?orderBy="mediaId"&equalTo="${mediaId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const viewMediaDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve media details for a specific firebase key
  fetch(`${endpoint}/media/${firebaseKey}.json`, {
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
  getMedia,
  createMedia,
  getSingleMedia,
  deleteSingleMedia,
  updateMedia,
  getMediaComments,
  viewMediaDetails,
};
