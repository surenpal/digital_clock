import React, { useState, useEffect } from "react";

export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(time.getMonth());
  const [currentYear, setCurrentYear] = useState(time.getFullYear());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerID);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB");
  const formattedDate = time.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push("");
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <div className="w-[350px] mx-auto mt-6 p-6 rounded-xl bg-gray-900 text-white text-center font-sans">
      <h1 className="text-2xl font-bold mb-2">Digital Clock</h1>

      <h2 className="text-4xl font-semibold">{formattedTime}</h2>
      <h3 className="text-lg opacity-80 mb-6">{formattedDate}</h3>

      <div className="flex justify-between items-center mb-3">
        <button
          onClick={goToPreviousMonth}
          className="bg-gray-700 px-3 py-1 rounded-md"
        >
          ◀
        </button>

        <h2 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </h2>


        <button
          onClick={goToNextMonth}
          className="bg-gray-700 px-3 py-1 rounded-md"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1 font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <div
              key={index}
              className={`py-2 rounded-md ${
                isToday
                  ? "bg-cyan-400 text-black font-bold"
                  : "bg-gray-800 text-white"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};