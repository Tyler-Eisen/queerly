import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleResource } from '../../../api/resourceData';
import ResourceForm from '../../../components/forms/ResourceForm';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleResource(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update {editItem.name} </title>
      </Head>
      <ResourceForm obj={editItem} />
    </>
  );
}
