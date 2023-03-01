import { getEventComments, getSingleEvent } from './eventData';

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

export default viewEventDetails;
