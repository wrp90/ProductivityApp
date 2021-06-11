import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../utils/eventsAPI";
import { Modal, Button } from "react-bootstrap";

function MyCalendar (){
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [eventTitle, setTitle] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [modalControl, setModalControl] = useState();
  const [activeEvent, setActiveEvent] = useState({title: "workaround"});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  };

  function handleSelect() {
    if (eventTitle) {
      API.saveEvent({
        start: start,
        end: end,
        title: eventTitle
      })
        .then(res => {
          loadEvents()
          handleClose()
        })
        .catch(err => console.log(err));
    }
  }

    return (
      <div className="Calendar">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          {modalControl ? (
            <div>
              <Modal.Body>
                <div className="form-group">
                  <div size="12">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Title"
                      name="Title"
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSelect}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </div>
            ) : (
              <div>
                <Modal.Title>
                  {activeEvent.title}
                </Modal.Title>
                <Modal.Body>
                  Delete Event?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={e => {
                  deleteEvent(activeEvent._id)
                  handleClose()
                  }}>
                  Confirm
                </Button>
              </Modal.Footer>
              </div>
          ) }
        </Modal>
        <Calendar
          selectable={true}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
          onSelectEvent={event => {
            setModalControl(false)
            setActiveEvent(event)
            handleShow()
          }}
          // alert("Deleting event " + [event.title, deleteEvent(event._id)])}
          onSelectSlot={event => {
            setModalControl(true)
            setStart(event.start)
            setEnd(event.end)
            handleShow()
          }}
          views={['month', 'week','day', 'agenda']}
        />
      </div>
    );
}

export default MyCalendar;