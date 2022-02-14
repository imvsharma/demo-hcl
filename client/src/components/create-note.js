import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../actions";
import { store } from "../helpers";
import {useNavigate} from 'react-router-dom'


const CreateNote = () => {
    const state = store.getState();
    const [author, setAuthor] = useState(state?.authentication?.user?.id)
    const [inputs, setInputs] = useState({username: '',password: ''});
    const [submitted, setSubmitted] = useState(false);
    let navigate = useNavigate()

    const { title, content } = inputs;
    const creating = useSelector(state => state.notes.creatingNotes)
    const dispatch = useDispatch();
    //const location = useLocation();


    useEffect(() => {
        dispatch(notesActions.getAll());
        
    })

    function handleChange(e) {
        console.log(e.target.value)
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (author && title && content) {
            dispatch(notesActions.createNote({author:author,title, content}));
            //dispatch(notesActions.getAll())
            navigate('/notes');
        }
    }



    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs lg="6" >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" value={title} placeholder="Enter title"  onChange={handleChange} />
                        {submitted && !title &&
                            <div className="invalid-feedback">title is required</div>
                        }
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" type="text" value={content} placeholder="Content" onChange={handleChange} />
                        {submitted && !content &&
                            <div className="invalid-feedback">Content is required</div>
                        }
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    {creating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateNote;