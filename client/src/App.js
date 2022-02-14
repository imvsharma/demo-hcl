import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import { alertActions, userActions } from "./actions";
import './App.css';
import CreateNote from "./components/create-note";
import { LoginPage } from './components/login';
import NotesListPage from "./components/notes";
import { SignupPage } from "./components/signup";
import { store } from "./helpers";




function App() {
  let isAuthenticate = false
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = store.getState()
  if(state?.authentication?.loggingIn) {
    isAuthenticate = true
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(userActions.logout());
    if(localStorage.length === 0) {
      console.log(state)
      navigate('/login');
      isAuthenticate = false
    }
}


  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >React-Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {isAuthenticate ? (
              <>
              <Nav.Link>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} >
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>Signup</Link>
            </Nav.Link>
            </>
            ) : (
              <>
              <Nav.Link>
                <Link to="/createnote" style={{ textDecoration: 'none', color: 'white' }}>Create Note</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} >
                <Link to="/notes" style={{ textDecoration: 'none', color: 'white' }}>Notes</Link>
            </Nav.Link>
            <Nav.Link eventKey={2} >
                <div style={{ textDecoration: 'none', color: 'white' }} onClick={handleClick}>Logout</div>
            </Nav.Link>
            </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="notes" element={<NotesListPage />} />
      <Route path="createnote" element={<CreateNote />} />
    </Routes>
    <Outlet />
    </>
  );
}

export default App;
