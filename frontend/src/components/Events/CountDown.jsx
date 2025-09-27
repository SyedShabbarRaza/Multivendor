import React, { useEffect, useState } from "react";

function CountDown({data}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.end_date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)), //Number of second in day * 1k to get miliseconds
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24), //Hours in a day
        minutes: Math.floor((difference / 1000 / 60) % 60), //Minutes in a day
        seconds: Math.floor((difference / 1000) % 60), //Seconds in a day
      };
    }
    return timeLeft;
  }
  const timerComponents = Object.keys(timeLeft).map((key) => {
    if (!timeLeft[key]) {
      return null;
    }

    return (
        <span key={key} className="text-[20px] font-bold text-red-600">
      {timeLeft[key]} {key}{" "}
    </span>
    )
  });
  return (
    <div className="">
      {timerComponents.length >0 ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's up!</span>
      )}
    </div>
  );
}

export default CountDown;
