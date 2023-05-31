// Import client credentials from utils
import { clientCredentials } from '../utils/client';

// Set the endpoint for API calls
const endpoint = clientCredentials.databaseURL;

// GET ALL RESOURCES
const getResources = () => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all resources
  fetch(`${endpoint}/resources.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // If there are resources, resolve with an array of event objects
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE RESOURCE
const createResource = (payload) => new Promise((resolve, reject) => {
  // Make a POST request to create a new resource
  fetch(`${endpoint}/resources.json`, {
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

// GET SINGLE RESOURCE
const getSingleResource = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single resource by its firebase key
  fetch(`${endpoint}/resources/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE RESOURCE
const deleteSingleResource = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a DELETE request to delete a single resource by its firebase key
  fetch(`${endpoint}/resources/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// UPDATE RESOURCE
const updateResource = (payload) => new Promise((resolve, reject) => {
  // Make a PATCH request to update an existing resource
  fetch(`${endpoint}/resources/${payload.firebaseKey}.json`, {
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

const getResourceComments = (resourceId) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve all resource comments for a specific resource ID
  fetch(`${endpoint}/comments.json?orderBy="resourceId"&equalTo="${resourceId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
    },
  })
    .then((response) => {
      console.warn(response);
      return response.json();
    })
    .then((data) => {
      // console.warn(data);
      resolve(Object.values(data));
    })
    .catch(reject);
});

const viewResourceDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve resource details for a specific firebase key
  fetch(`${endpoint}/resources/${firebaseKey}.json`, {
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
  getResources,
  createResource,
  getSingleResource,
  deleteSingleResource,
  updateResource,
  getResourceComments,
  viewResourceDetails,
};
