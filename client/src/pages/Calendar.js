import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function MyCalendar (){
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  function handleSelect({ start, end }) {
    const title = window.prompt("New Event name");
    if (title) {
      var newEvent = {
        start: start,
        end: end,
        title: title
      };
      setEvents([...events, newEvent]);
    }
  }

  
    return (
      <div className="Calendar">
        <Calendar
          selectable={true}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </div>
    );
}

export default MyCalendar;