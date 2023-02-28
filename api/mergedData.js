import { getEventComments, getSingleEvent } from './eventData';

const viewEventDetails = (eventFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleEvent(eventFirebaseKey), getEventComments(eventFirebaseKey)])
    .then(([eventObject, commentsArray]) => {
      resolve({ ...eventObject, comments: commentsArray });
    }).catch((error) => reject(error));
});

export default viewEventDetails;
