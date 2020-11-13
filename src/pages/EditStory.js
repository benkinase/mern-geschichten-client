// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import $ from "jquery";
// import axios from "../axios";
// import styled from "styled-components/macro";
// import { Button, Form } from "react-bootstrap";
// import { useHistory, useParams } from "react-router-dom";
// import { StoryContext } from "../contexts/StoryContext";

// export default function EditStory(props) {
//   const { updateStory, message } = React.useContext(StoryContext);
//   console.log(message);
//   let params = useParams();
//   let history = useHistory();

//   const [error, setError] = useState("");
//   const [currentStory, setCurrentStory] = React.useState({
//     _id: "",
//     title: "",
//     content: "",
//     status: "",
//   });

//   // get current story id
//   const currentId = params.id;

//   // // get story from state
//   // React.useEffect(() => {
//   //   const getItem = async (currentId) => {
//   //     const story = await stories.find((story) => story._id === currentId);
//   //     setCurrentStory({
//   //       title: story.title,
//   //       content: story.content,
//   //       status: story.status,
//   //     });
//   //   };
//   //   getItem(currentId);
//   // }, [currentId]);

//   // fetch current story
//   React.useEffect(() => {
//     async function getStory() {
//       const { data } = await axios("/api/stories/edit/" + currentId);
//       //console.log(data);
//       setCurrentStory({
//         title: data.title,
//         content: data.content,
//         status: data.status,
//       });
//       //console.log(currentStory);
//     }
//     getStory();
//   }, [currentId]);

//   const handleChange = (e) => {
//     setCurrentStory({
//       ...currentStory,
//       [e.target.name]: e.target.value,
//     });
//   };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const updatedStory = {
//       _id: currentId,
//       title: currentStory.title,
//       content: currentStory.content,
//       status: currentStory.status,
//     };
//     //console.log(updatedStory);
//     try {
//       if (!updatedStory) return;
//       updateStory(currentId, updatedStory);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: message ? `${message}` : "Story updated!",
//         showConfirmButton: false,
//         timer: 3000,
//       });
//       history.push("/profile");
//       setTimeout(function () {
//         window.location.reload(false);
//       }, 2000);
//     } catch (err) {
//       setError(err.msg);
//     }
//   }

//   $(document).ready(function () {
//     $("*[data-max]").keyup(function () {
//       let text_max = $(this).data("max");
//       let text_length = $(this).val().length;
//       let text_remaining = text_max - text_length;
//       $(".char-max-alert").html(`${text_length}/${text_remaining}`);
//     });
//   });

//   return (
//     <EditContainer>
//       <Form className="container form">
//         <span className="text-danger">{error}</span>
//         <Form.Group controlId="exampleForm.ControlSelect1">
//           <Form.Label>Status</Form.Label>
//           <Form.Control
//             as="select"
//             autoFocus
//             type="text"
//             name="status"
//             value={currentStory.status}
//             onChange={handleChange}
//           >
//             <option disabled hidden value=""></option>
//             <option value="public">public</option>
//             <option value="private">private</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="title" bssize="large">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             autoFocus
//             required
//             type="text"
//             name="title"
//             value={currentStory.title}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="content" bssize="large">
//           <Form.Label>Content</Form.Label>
//           <span className="char-max-alert red-text ml-2"></span>
//           <Form.Control
//             as="textarea"
//             value={currentStory.content}
//             onChange={handleChange}
//             type="text"
//             name="content"
//             maxLength="250"
//             data-max="250"
//             required
//           />
//         </Form.Group>
//         <p className="float-right mt-1 mb-2">
//           <Button
//             variant="secondary"
//             type="button"
//             className="mr-3"
//             onClick={() => history.push("/profile")}
//           >
//             Close
//           </Button>
//           <Button variant="info" type="submit" onClick={handleSubmit}>
//             Update
//           </Button>
//         </p>
//       </Form>
//     </EditContainer>
//   );
// }
// const EditContainer = styled.div`
//   .form {
//     width: 400px;
//     min-height: 52vh;
//     margin: 4rem auto;
//     padding: 30px;
//     box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
//     border-radius: 10px;
//     background: var(--editWhite);
//   }
// `;
