import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalLesson(props) {
    const [name, setName] = useState('')
    const [idChapter, setIdChapter] = useState('')
    const [video, setVideo] = useState('')
    const handleClose = () => {
        props.toggle()
    }
    const handleChange = (event) => {
        setIdChapter(event.target.value);
    };
    const handleCreateLesson = (name, idChapter,video) => {
        if (!idChapter || !name || !video) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        const data = new FormData()
        data.append('name',name)
        data.append('idChapter',idChapter)
        data.append('video',video)
        props.handleCreateLesson(data)
        props.toggle()
    }

    const handleOnChangeInput = (event, index) => {
        switch (index) {
            case 'name':
                setName(event.target.value)
                break;
            case 'video':
                setVideo(event.target.files[0])
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
                    <Form.Select value={idChapter} onChange={handleChange} aria-label="Default select example" id='selectCourse'>
                        <option value="0">Chapter Name</option>
                        {props.chapters.map((element) => <option key={element[0]} value={element[0]}>{element[1]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'name') }}
                        value={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Video</Form.Label>
                    <Form.Control type="file" onChange={(event) => { handleOnChangeInput(event, 'video') }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={async () => {
                    let data = handleCreateLesson(name, idChapter, video)

                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalLesson;