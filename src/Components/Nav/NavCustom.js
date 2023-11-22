import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavCustom.css'

import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

function NavCustom() {
    const [userData, setUserData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const logout = () =>{
        sessionStorage.removeItem('token')

    }
    useEffect(() => {
        // Lấy token từ sessionStorage
        const token = sessionStorage.getItem('token') || null;

        // Kiểm tra xem token có tồn tại không
        if (token) {
            try {
                // Giải mã token
                const decodedToken = jwtDecode(token);
                let username = decodedToken.data.firstName + ' ' + decodedToken.data.lastName

                // Lưu thông tin từ token vào state
                setUserData(username);
                setIsAdmin(decodedToken.data.isAdmin);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                // Xử lý lỗi khi giải mã token
            }
        }
    }, []);
    return (
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">Courses</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>
                        {isAdmin==1 && <Nav.Link href="/admin/courses">Manage Courses</Nav.Link>}
                        {isAdmin==1 && <Nav.Link href="/admin/chapters">Manage Chapters</Nav.Link>}
                        {isAdmin==1 && <Nav.Link href="/admin/lessons">Manage Lessons</Nav.Link>}
                        <Form className="search d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                    {userData ? <NavDropdown title={userData} id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">My Account</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            My Courses
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() =>logout()} href='/login'>
                            Log out
                        </NavDropdown.Item>
                    </NavDropdown> :
                        <Button type="button" id="navbarScrollingDropdown" href="/login">Log in</Button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavCustom;