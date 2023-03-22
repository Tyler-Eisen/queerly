import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../api/eventData';
import EventForm from '../../../components/forms/Events/EventForm';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEvent(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update {editItem.name} </title>
      </Head>
      <EventForm obj={editItem} />
    </>
  );
}
