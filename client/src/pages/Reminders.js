import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/remindersAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Reminders() {
  const [reminders, setReminders] = useState([])
  const [formObject, setFormObject] = useState({})
  
  useEffect(() => {
    loadReminders()
  }, [])

  function loadReminders() {
    API.getReminders()
      .then(res => 
        setReminders(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteReminder(id) {
    API.deleteReminder(id)
      .then(res => loadReminders())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.text) {
      API.saveReminder({
        title: formObject.title,
        text: formObject.text
      })
        .then(res => loadReminders())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
        <Col size="md-3 sm-12">
            <Jumbotron>
              <h1>Saved Reminders</h1>
            </Jumbotron>
            {reminders.length ? (
              <List>
                {reminders.map(reminder => (
                  <ListItem key={reminder._id}>
                    <Link to={"/reminders/" + reminder._id}>
                      <strong>
                        {reminder.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteReminder(reminder._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-9">
            <Jumbotron>
              <h1>Reminders</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="text"
                placeholder="Text"
              />
              <FormBtn
                disabled={!(formObject.text && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Reminder
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }

export default Reminders;