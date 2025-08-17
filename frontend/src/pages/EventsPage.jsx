import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'

function EventsPage() {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true}/>
        <EventCard active={true}/>
    </div>
  )
}

export default EventsPage