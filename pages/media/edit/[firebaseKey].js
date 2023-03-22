import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleMedia } from '../../../api/mediaData';
import MediaForm from '../../../components/forms/Media/MediaForm';

export default function EditMedia() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMedia(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update {editItem.name} </title>
      </Head>
      <MediaForm obj={editItem} />
    </>
  );
}
