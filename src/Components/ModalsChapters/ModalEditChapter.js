import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';

// import './ModalEditChapter.css'

function ModalEditChapter(props) {
    const [name, setName] = useState(props.name)
    const [idCourse, setIdCourse] = useState(props.idCourse)
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }
    const handleChange = (event) => {
        setIdCourse(event.target.value);
    };
    const handleUpdateChapter = (name, idCourse, id) => {
        if (!name || idCourse == 0 || !id) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }

        const formData = {
            name,
            idCourse,
            id
        }
        props.handleUpdateChapter(formData)
        props.toggle()

    }

    const handleOnChangeInput = (event, index) => {
        switch (index) {
            case 'name':
                setName(event.target.value)
                break;
            case 'idCourse':
                setIdCourse(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'name') }}
                        value={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Course</Form.Label>
                    <Form.Select value={idCourse} onChange={handleChange} aria-label="Default select example" id='selectCourse'>
                        {props.courses.map((element) =>
                            <option
                                defaultValue={element[0] == props.idCourse}
                                key={element[0]}
                                value={element[0]}>{element[1]}</option>)}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    // let data = handleCreateCourse(name, idCourse, img)
                    handleUpdateChapter(name, idCourse, id)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalEditChapter;