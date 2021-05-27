import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Notes() {
  // Setting our component's initial state
  const [notes, setNotes] = useState([])
  const [formObject, setFormObject] = useState({})

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
                {notes.map(note => (
                  <ListItem key={note._id}>
                    <Link to={"/notes/" + note._id}>
                      <strong>
                        {note.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteNote(note._id)} />
                  </ListItem>
                ))}
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