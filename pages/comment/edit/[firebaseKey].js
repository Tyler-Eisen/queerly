import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleComment, updateComment } from '../../../api/commentData';
import CommentForm from '../../../components/forms/CommentForm';

export default function EditComment() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey and eventId
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  const handleUpdate = (updatedItem) => {
    updateComment(updatedItem).then(() => router.push(`/event/${firebaseKey}`));
  };

  return (
    <>
      <Head>
        <title>Update Comment </title>
      </Head>
      <CommentForm obj={editItem} firebaseKey={firebaseKey} onUpdate={handleUpdate} />
    </>
  );
}
