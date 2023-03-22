import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getResources = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createResource = (payload) => new Promise((resolve, reject) => {
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
