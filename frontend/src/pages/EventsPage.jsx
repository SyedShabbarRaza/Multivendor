import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader';

function EventsPage() {
    const { allEvents, isLoading } = useSelector((state) => state.events);
return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents&&allEvents.map((events)=>(
            <EventCard active={true} data={events} />
          ))}
          {
            allEvents.length===0&&(
              <div className="">No Events</div>
            )
          }
        </div>
      )}
    </>
  );
}

export default EventsPage