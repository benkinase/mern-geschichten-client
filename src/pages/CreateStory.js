import React, { useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import styled from "styled-components";

export default function CreateStory() {
  const { createStory, message, error, loading } = React.useContext(
    StoryContext
  );

  const { user } = React.useContext(AuthContext);
  const [er, setEr] = useState("");
  const [story, setStory] = React.useState({
    id: "",
    title: "",
    content: "",
    status: "",
  });

  //Model control
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function validForm() {
    const validcontent = story.content.length > 10;
    const validtitle = story.title.length > 5;

    return validcontent && validtitle;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newStory = {
      user: user._id,
      title: story.title,
      content: story.content,
      status: story.status,
    };
    //console.log(story);

    try {
      if (!newStory) return;
      createStory(newStory);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message ? `${message}` : "Story created!",
        showConfirmButton: false,
        timer: 3000,
      });
      handleClose();
      setTimeout(function () {
        window.location.reload(false);
      }, 2000);
    } catch (err) {
      setEr(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  $(document).ready(function () {
    $("*[data-max]").keyup(function () {
      let text_max = $(this).data("max");
      let text_length = $(this).val().length;
      let text_remaining = text_max - text_length;
      $(".char-max-alert").html(`${text_length}/${text_remaining}`);
    });
  });
  return (
    <CreateContatiner>
      <span onClick={handleShow}>Create Story</span>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          {er && <span className="text-danger">{er}</span>}
          <Modal.Title>Story</Modal.Title>
          {loading && <div>Loading...</div>}
          {error && <div className="yellow-text">{error}</div>}
        </Modal.Header>
        <Modal.Body>
          <Form className="container">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                autoFocus
                type="text"
                name="status"
                value={story.status}
                onChange={handleChange}
              >
                <option disabled hidden value=""></option>
                <option value="public">public</option>
                <option value="private">private</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" bssize="large">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                required
                maxlength="20"
                type="text"
                name="title"
                value={story.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="content" bssize="large">
              <Form.Label>Content</Form.Label>
              <span className="char-max-alert red-text ml-2"></span>
              <Form.Control
                as="textarea"
                value={story.content}
                onChange={handleChange}
                type="text"
                name="content"
                required
                maxlength="250"
                data-max="250"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="info"
            type="submit"
            disabled={!validForm()}
            onClick={handleSubmit}
            className="text-blue"
          >
            {"Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </CreateContatiner>
  );
}

const CreateContatiner = styled.div``;
