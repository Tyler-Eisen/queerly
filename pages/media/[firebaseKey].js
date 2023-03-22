import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import CommentCard from '../../components/cards/CommentCard';
import { getMediaComments, getSingleMedia } from '../../api/mediaData';
import MediaCommentForm from '../../components/forms/Media/MediaCommentForm';

function ViewMedia() {
  const [mediaDetails, setMediaDetails] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query ?? {};

  const updateCommentsList = () => {
    getMediaComments(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getSingleMedia(firebaseKey).then(setMediaDetails);
    getMediaComments(firebaseKey).then(setComments);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{mediaDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={mediaDetails.image} alt={mediaDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {mediaDetails.name}
            <br />
            Type: {mediaDetails.type}
            <br />
            Price: {mediaDetails.price}
          </h5>
        </div>
      </div>
      <div> <MediaCommentForm firebaseKey={firebaseKey} onUpdate={updateCommentsList} />
      </div>
      {/* <hr /> */}
      <Head>
        <title>Comments</title>
      </Head>
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={() => getMediaComments(firebaseKey).then(setComments)} />
        ))}
      </div>
    </>
  );
}

export default ViewMedia;
