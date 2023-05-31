import { deleteSingleComment } from './commentData';
import { deleteSingleEvent, getEventComments, getSingleEvent } from './eventData';
import { deleteSingleMedia, getMediaComments } from './mediaData';
import { deleteSingleResource, getResourceComments } from './resourceData';

// VIEW EVENT DETAILS
const viewEventDetails = (eventFirebaseKey) => new Promise((resolve, reject) => {
  // Retrieve the event object for the given firebase key

  getSingleEvent(eventFirebaseKey)
    .then((eventObject) => {
      // Retrieve all comments for the event and add them to the event object
      getEventComments(eventObject.firebaseKey)
        .then((commentsArray) => {
          resolve({ ...eventObject, comments: commentsArray });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});
// DELETE EVENT COMMENTS
const deleteEventComments = (eventId) => new Promise((resolve, reject) => {
  // Retrieve all comments for the event
  getEventComments(eventId).then((commentsArray) => {
    // Create an array of promises to delete each comment
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    // Resolve all promises to delete comments, then delete the event itself
    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleEvent(eventId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// DELETE MEDIA COMMENTS
const deleteMediaComments = (mediaId) => new Promise((resolve, reject) => {
  // Retrieve all comments for the media
  getMediaComments(mediaId).then((commentsArray) => {
    // Create an array of promises to delete each comment
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    // Resolve all promises to delete comments, then delete the media itself
    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleMedia(mediaId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// DELETE RESOURCE COMMENTS
const deleteResourceComments = (resourceId) => new Promise((resolve, reject) => {
  // Retrieve all comments for the resource
  getResourceComments(resourceId).then((commentsArray) => {
    // Create an array of promises to delete each comment
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    // Resolve all promises to delete comments, then delete the resource itself
    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleResource(resourceId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewEventDetails, deleteEventComments, deleteMediaComments, deleteResourceComments,
};
