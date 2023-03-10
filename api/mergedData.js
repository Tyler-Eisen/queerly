import { deleteSingleComment } from './commentData';
import { deleteSingleEvent, getEventComments, getSingleEvent } from './eventData';

const viewEventDetails = (eventFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEvent(eventFirebaseKey)
    .then((eventObject) => {
      getEventComments(eventObject.firebaseKey)
        .then((commentsArray) => {
          console.warn(commentsArray);
          resolve({ ...eventObject, comments: commentsArray });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

const deleteEventComments = (eventId) => new Promise((resolve, reject) => {
  getEventComments(eventId).then((commentsArray) => {
    console.warn(commentsArray, 'Event Comments');
    const deleteCommentPromises = commentsArray.map((comment) => deleteSingleComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleEvent(eventId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewEventDetails, deleteEventComments };
