import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getResourceComments, getSingleResource } from '../../api/resourceData';
import CommentCard from '../../components/cards/CommentCard';
import ResourceCommentForm from '../../components/forms/Resource/ResourceCommentForm';

function ViewResource() {
  const [resourceDetails, setResourceDetails] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query ?? {};

  const updateCommentsList = () => {
    getResourceComments(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getSingleResource(firebaseKey).then(setResourceDetails);
    getResourceComments(firebaseKey).then(setComments);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{resourceDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={resourceDetails.image} alt={resourceDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {resourceDetails.name}
            <br />
            Location: {resourceDetails.location}
            <br />
            Type: {resourceDetails.type}
            <br />
            Price: {resourceDetails.price}
          </h5>
        </div>
      </div>
      <div>
        <ResourceCommentForm firebaseKey={firebaseKey} onUpdate={updateCommentsList} />
      </div>
      <Head>
        <title>Comments</title>
      </Head>
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={() => getResourceComments(firebaseKey).then(setComments)} />
        ))}
      </div>
    </>
  );
}

export default ViewResource;
