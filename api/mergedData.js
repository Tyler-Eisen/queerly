import { deleteSingleComment } from './commentData';
import { deleteSingleEvent, getEventComments, getSingleEvent } from './eventData';
import { deleteSingleMedia, getMediaComments } from './mediaData';
import { deleteSingleResource, getResourceComments } from './resourceData';

const viewEventDetails = (eventFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEvent(eventFirebaseKey)
    .then((eventObject) => {
      getEventComments(eventObject.firebaseKey)
        .then((commentsArray) => {
          resolve({ ...eventObject, comments: commentsArray });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

const deleteEventComments = (eventId) => new Promise((resolve, reject) => {
  getEventComments(eventId).then((commentsArray) => {
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleEvent(eventId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteMediaComments = (mediaId) => new Promise((resolve, reject) => {
  getMediaComments(mediaId).then((commentsArray) => {
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleMedia(mediaId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteResourceComments = (resourceId) => new Promise((resolve, reject) => {
  getResourceComments(resourceId).then((commentsArray) => {
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleResource(resourceId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewEventDetails, deleteEventComments, deleteMediaComments, deleteResourceComments,
};
