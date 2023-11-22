import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalCourse(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('')
    const handleClose = () => {
        props.toggle()
    }

    const handleCreateCourse = (name, description, img) => {
        if (!name || !description || !img) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', img);
        let rs = props.handleCreateCourse(formData)
        props.toggle()
        return rs
    }

    const handleOnChangeInput = (event, index) => {
        switch (index) {
            case 'name':
                setName(event.target.value)
                break;
            case 'description':
                setDescription(event.target.value)
                break;
            case 'img':
                setImg(event.target.files[0])
                break;
            default:
                break;
        }
    }

    return (
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'name') }}
                        value={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'description') }}
                        value={description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(event) => { handleOnChangeInput(event, 'img') }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={async () => {
                    let rs = await handleCreateCourse(name, description, img)
                    console.log(rs)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalCourse;