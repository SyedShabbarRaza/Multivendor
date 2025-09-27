import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";

function Events() {
  const { allEvents ,isLoading} = useSelector((state) => state.events);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] mx-auto">
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid shadow-lg rounded-2xl">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
