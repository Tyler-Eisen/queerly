/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEvents } from '../../api/eventData';
import { getMedia } from '../../api/mediaData';
import { getResources } from '../../api/resourceData';
import EventCard from '../../components/EventCard';
import MediaCard from '../../components/MediaCard';
import ResourceCard from '../../components/ResourceCard';

export default function SearchBar() {
  const [searchEvents, setSearchEvents] = useState([]);
  const [searchResources, setSearchResources] = useState([]);
  const [searchMedia, setSearchMedia] = useState([]);

  const router = useRouter();
  const { searchbar } = router.query;

  const searchAllEvents = () => {
    getEvents().then((events) => {
      const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(searchbar?.toLowerCase()));
      const sortedEvents = filteredEvents.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchEvents(sortedEvents);
    });
  };

  const searchAllResources = () => {
    getResources().then((resources) => {
      const filteredResources = resources.filter((resource) => resource.name.toLowerCase().includes(searchbar?.toLowerCase()));
      const sortedResources = filteredResources.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchResources(sortedResources);
    });
  };

  const searchAllMedia = () => {
    getMedia().then((media) => {
      const filteredMedia = media.filter((content) => content.name.toLowerCase().includes(searchbar?.toLowerCase()));
      const sortedMedia = filteredMedia.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchMedia(sortedMedia);
    });
  };

  useEffect(() => {
    searchAllEvents();
    searchAllResources();
    searchAllMedia();
    return () => {
      setSearchEvents([]);
      setSearchResources([]);
      setSearchMedia([]);
    };
  }, [searchbar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchEvents.map((event) => (
          <div className="d-flex" key={event.firebaseKey}>
            <EventCard eventObj={event} onUpdate={searchAllEvents} />
          </div>
        ))}
        {searchResources.map((resource) => (
          <div className="d-flex" key={resource.firebaseKey}>
            <ResourceCard resourceObj={resource} onUpdate={searchAllResources} />
          </div>
        ))}
        {searchMedia.map((content) => (
          <div className="d-flex" key={content.firebaseKey}>
            <MediaCard mediaObj={content} onUpdate={searchAllMedia} />
          </div>
        ))}
      </div>
    </>
  );
}
