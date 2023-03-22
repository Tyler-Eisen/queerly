import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMedia = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/media.json`, {
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

const createMedia = (payload) => new Promise((resolve, reject) => {
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
