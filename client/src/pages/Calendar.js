import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../utils/eventsAPI"

function MyCalendar (){
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents()
  }, [])

  function loadEvents() {
    API.getEvents()
      .then(res => 
        setEvents(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteEvent(id) {
    API.deleteEvent(id)
      .then(res => loadEvents())
      .catch(err => console.log(err));
  }

  function handleSelect({ start, end }) {
    const title = window.prompt("New Event name");
    if (title) {
      API.saveEvent({
        start: start,
        end: end,
        title: title
      })
        .then(res => loadEvents())
        .catch(err => console.log(err));
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