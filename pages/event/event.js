import React, { useEffect, useState } from 'react';
import {
  Button, Col, Row, Form,
} from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getEvents } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';
import EventCard from '../../components/EventCard';

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState('');

  const { user } = useAuth();

  const getAllTheEvents = () => {
    const startDate = new Date();
    const endDate = new Date();
    switch (selectedRange) {
      case 'next-month':
        endDate.setMonth(startDate.getMonth() + 1);
        break;
      case 'next-three-months':
        endDate.setMonth(startDate.getMonth() + 3);
        break;
      case 'next-six-months':
        endDate.setMonth(startDate.getMonth() + 6);
        break;
      case 'next-year':
        endDate.setFullYear(startDate.getFullYear() + 1);
        break;
      default:
        // If no range is selected, fetch all events
        endDate.setFullYear(startDate.getFullYear() + 1000);
        break;
    }
    getEvents().then((data) => {
      const filteredData = data.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate < endDate;
      });
      // console.warn(filteredData);
      setEvents(filteredData);
    });
  };
  console.warn(selectedRange);

  useEffect(() => {
    getAllTheEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <div className="d-flex" style={{ fontSize: '1.8rem', height: 'calc(100vh - 4rem)' }}>
        <div className="summary-container col-md-4 p-4 width: '100%', margin: '0'" style={{ height: '100%', overflowY: 'auto' }}>
          <h2 style={{ fontWeight: 'bold' }}>queerly Events</h2>
          <p style={{ lineHeight: '1.5' }}>Our mission is to help LGBTQ+ individuals find a way to create community in place. Part of that is helping you find events near you which will give you the chance to meet other members of the community while celebrating your queerness! We strive to find a wide variety of events to connect you with and encourage you to add any events you would like others to know about. Click on an event for further information as well as a chance to see what other users are saying about it!</p>
          <div className="d-flex align-items-center justify-content-between my-4">
            <Link href="/event/new" passHref>
              <Button>Add An Event</Button>
            </Link>
            <Form.Select onChange={handleRangeChange} value={selectedRange} style={{ display: 'inline-block', width: 'auto' }}>
              <option value="">All events</option>
              <option value="next-month">Next month</option>
              <option value="next-three-months">Next 3 months</option>
              <option value="next-six-months">Next 6 months</option>
              <option value="next-year">Next year</option>
            </Form.Select>
          </div>
        </div>
        <div className="card-container col-md-8 p-4" style={{ fontSize: '1rem', height: '100%', overflowY: 'auto' }}>
          <Row className="justify-content-center">
            {events.map((event) => (
              <Col key={event.firebaseKey} md={6} className="mb-4">
                <EventCard uid={user.uid} eventObj={event} onUpdate={getAllTheEvents} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
