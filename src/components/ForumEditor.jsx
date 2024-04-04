import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ForumEditor({ postId, getPosts }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSave() {
    //update the post
    updateDoc(doc(db, "posts", postId), {
      title,
      body: post,
    })
      .then(() => {
        console.log("Document successfully updated!");
        getPosts();
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title..."
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post</Form.Label>
              <Form.Control
                value={post}
                onChange={(e) => setPost(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
