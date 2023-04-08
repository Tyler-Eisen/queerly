/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getMedia } from '../../api/mediaData';
import { useAuth } from '../../utils/context/authContext';
import MediaCard from '../../components/MediaCard';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const { user } = useAuth();

  const getAllTheMedia = (type = '') => {
    getMedia(user.uid)
      .then((data) => {
        if (type === '') {
          setMedia(data);
        } else {
          setMedia(data.filter((item) => item.type === type));
        }
      });
  };

  useEffect(() => {
    getAllTheMedia();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    getAllTheMedia(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Media</title>
      </Head>
      <div className="d-flex" style={{ fontSize: '1.8rem', height: 'calc(100vh - 4rem)' }}>
        <div className="summary-container col-md-4 p-4 width: '100%', margin: '0'" style={{ height: '100%', overflowY: 'auto' }}>
          <h2 style={{ fontWeight: 'bold' }}>queerly Media</h2>
          <p style={{ lineHeight: '1.5' }}>Sharing queer media is seen as an important way to connect LGBTQ+ individuals with each other and to celebrate their queerness. By finding and sharing media that resonates with their experiences, queerly aims to help people build community and create meaningful connections. The platform encourages users to share their favorite media and to explore recommendations, providing a space where people can discover new content and engage in conversations about what they love.</p>
          <div className="d-flex align-items-center justify-content-between my-4">
            <Link href="/media/new" passHref>
              <Button>Add A Recommendation</Button>
            </Link>
            <div style={{ marginLeft: '10px' }}>
              <Form.Select onChange={handleTypeChange} value={selectedType} style={{ display: 'inline-block', width: 'auto' }}>
                <option value="">All</option>
                <option value="Tv-show">TV</option>
                <option value="Film">Film</option>
                <option value="Podcast">Podcast</option>
                <option value="Book">Book</option>
                <option value="other">Other</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="card-container col-md-8 p-4" style={{ fontSize: '1rem', height: '100%', overflowY: 'auto' }}>
          <Row className="justify-content-center">
            {media.map((medium) => (
              <Col key={medium.firebaseKey} md={6} className="mb-4">
                <MediaCard uid={user.uid} mediaObj={medium} onUpdate={getAllTheMedia} />
              </Col>

            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
