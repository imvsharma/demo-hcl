import { useEffect, useState } from "react";
import { Badge, ListGroup, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notesActions } from "../actions";
import { store } from "../helpers";

const NotesListPage = () => {
    let navigate = useNavigate()
    const state = store.getState();
    
    const [noteList, setNoteList] = useState(state?.notes);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(notesActions.getAll());
        setNoteList(state?.notes)
    })

    function handleDelete (id) {
      dispatch(notesActions.deleteNote(id))
      dispatch(notesActions.getAll());
      //setNoteList(state?.notes);
      navigate('/notes')
    }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg="8">
          <ListGroup as="ol" numbered>
            {noteList.map((ele, index) => {
              return (
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{ele.title}</div>
                    {ele.content}
                  </div>
                  <div>
                    <Badge bg="primary">Edit</Badge> <Badge bg="danger" onClick={() => handleDelete(ele._id)}>Delete</Badge>{' '}
                  </div>
                </ListGroup.Item>
              )
            })}
            
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default NotesListPage;
