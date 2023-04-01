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
        {searchEvents.map((event) => <EventCard key={event.firebaseKey} eventObj={event} onUpdate={searchAllEvents} />)}
        {searchResources.map((resource) => <ResourceCard key={resource.firebaseKey} resourceObj={resource} onUpdate={searchAllResources} />)}
        {searchMedia.map((content) => <MediaCard key={content.firebaseKey} mediaObj={content} onUpdate={searchAllMedia} />)}
      </div>
    </>
  );
}
