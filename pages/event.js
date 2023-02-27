import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getEvents } from '../api/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/EventCard';

export default function EventPage() {
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const getAllTheEvents = () => {
    getEvents(user.uid).then(setEvents);
    console.warn(events);
  };

  useEffect(() => {
    getAllTheEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/event/new" passHref>
          <Button>Add An Event</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {events.map((event) => (
            <EventCard key={event.firebaseKey} eventObj={event} onUpdate={getAllTheEvents} />
          ))}
        </div>
      </div>
    </>
  );
}
