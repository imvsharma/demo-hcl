import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, Row, Button, Form, Col} from 'react-bootstrap'
import { userActions } from '../actions';
import { store } from '../helpers';
import { useNavigate } from 'react-router-dom';



export const LoginPage = () => {
    let navigate = useNavigate()
    const [inputs, setInputs] = useState({username: '',password: ''});
    const [submitted, setSubmitted] = useState(false);

    const { username, password } = inputs;

    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    //const location = useLocation();

    // reset login status
   /*  useEffect(() => { 
        dispatch(userActions.logout()); 
    }); */

    function handleChange(e) {
        console.log(e.target.value)
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
            const state = store.getState()
            if(state?.authentication?.loggingIn) {
                navigate('/notes')
            }
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs lg="6" >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" value={username} placeholder="Enter username"  onChange={handleChange} />
                        {submitted && !username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" value={password} placeholder="Password" onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}
