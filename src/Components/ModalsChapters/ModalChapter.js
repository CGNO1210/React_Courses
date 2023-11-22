import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalChapter(props) {
    const [name, setName] = useState('')
    const [idCourse, setIdCourse] = useState('')
    const handleClose = () => {
        props.toggle()
    }
    const handleChange = (event) => {
        setIdCourse(event.target.value);
    };
    const handleCreateChapter = (name, idCourse) => {
        if(!idCourse || !name){
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        const formData = {
            name,
            idCourse
        }
        props.handleCreateChapter(formData)
        props.toggle()
    }

    const handleOnChangeInput = (event, index) => {
        switch (index) {
            case 'name':
                setName(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Course</Form.Label>
                    <Form.Select value={idCourse} onChange={handleChange} aria-label="Default select example" id='selectCourse'>
                        <option value="0">Courses Name</option>
                        {props.courses.map((element) => <option key={element[0]} value={element[0]}>{element[1]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'name') }}
                        value={name} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={async () => {
                    let data = handleCreateChapter(name, idCourse)

                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalChapter;