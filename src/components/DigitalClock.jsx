import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const DigitalClock = () => {
const [time, setTime] = useState(new Date());

useEffect(() => {
  const timerID = setInterval(() => {
    setTime(new Date());
  }, 1000);
  return () => clearInterval(timerID);
}, []);

  return (
    <div>
        <h1>Digital Clock by Suren</h1>
    </div>
  )
}
