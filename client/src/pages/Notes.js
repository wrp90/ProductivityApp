import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Modal } from "react-bootstrap"

function Notes() {
  // Setting our component's initial state
  const [notes, setNotes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [activeNote, setActiveNote] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Load all notes and store them with setNotes
  useEffect(() => {
    loadNotes()
  }, [])

  // Loads all notes and sets them to notes
  function loadNotes() {
    API.getNotes()
      .then(res => 
        setNotes(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a note from the database with a given id, then reloads Notes from the db
  function deleteNote(id) {
    API.deleteNote(id)
      .then(res => loadNotes())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function links(note) {
    return (
      <ListItem key={note._id}>
        <h5 onClick={() => {noteSet(note._id)}}>
          {note.title}
        </h5>
        <DeleteBtn onClick={() => deleteNote(note._id)} />
      </ListItem>
    );
  }

  function noteSet(event) {
    API.getNote(event)
      .then(res => setActiveNote(res.data))
      .catch(err => console.log(err));
    handleShow();
  }

  // When the form is submitted, use the API.saveNote method to save the note data
  // Then reload Notes from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.text) {
      API.saveNote({
        title: formObject.title,
        text: formObject.text
      })
        .then(res => loadNotes())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
        <Col size="md-3 sm-12">
            <Jumbotron>
              <h1>Saved Notes</h1>
            </Jumbotron>
            {notes.length ? (
              <List>
                {notes.map(links, notes)}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{activeNote.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{activeNote.text}</Modal.Body>
                </Modal>
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-9">
            <Jumbotron>
              <h1>Notes</h1>
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
                Submit Note
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }


export default Notes;