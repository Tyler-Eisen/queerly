import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleComment } from '../../../api/commentData';
import CommentForm from '../../../components/forms/CommentForm';

export default function EditComment() {
  const [editItem, setEditItem] = useState({});
  // console.warn(editItem.eventId);
  const router = useRouter();
  // TODO: grab the firebasekey and eventId
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update Comment </title>
      </Head>
      <CommentForm obj={editItem} firebaseKey={firebaseKey} />
    </>
  );
}
