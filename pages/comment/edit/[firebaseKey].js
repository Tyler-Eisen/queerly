import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleComment } from '../../../api/commentData';
import CommentForm from '../../../components/forms/Events/CommentForm';
import MediaCommentForm from '../../../components/forms/Media/MediaCommentForm';
import ResourceCommentForm from '../../../components/forms/Resource/ResourceCommentForm';

const EditComment = () => {
  const [editItem, setEditItem] = useState({});
  const [featureType, setFeatureType] = useState('');

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    console.warn('firebaseKey in EditComment:', firebaseKey);
    getSingleComment(firebaseKey).then((comment) => {
      setEditItem(comment);
      if (comment.eventId) {
        setFeatureType('event');
      } else if (comment.mediaId) {
        setFeatureType('media');
      } else if (comment.resourceId) {
        setFeatureType('resource');
      }
    });
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update Comment</title>
      </Head>
      {featureType === 'event' && <CommentForm obj={editItem} firebaseKey={firebaseKey} />}
      {featureType === 'media' && <MediaCommentForm obj={editItem} firebaseKey={firebaseKey} />}
      {featureType === 'resource' && <ResourceCommentForm obj={editItem} firebaseKey={firebaseKey} />}
    </>
  );
};

export default EditComment;
