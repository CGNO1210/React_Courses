import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';

// import './ModalEditLesson.css'

function ModalEditLesson(props) {
    const [name, setName] = useState(props.name)
    const [idChapter, setIdChapter] = useState(props.idChapter)
    const [video, setVideo] = useState()
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }
    const handleChange = (event) => {
        setIdChapter(event.target.value);
    };
    const handleUpdateLesson = (name, idChapter, video, id) => {
        if (!idChapter || !name || !video) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        const data = new FormData()
        data.append('name', name)
        data.append('idChapter', idChapter)
        data.append('video', video)
        data.append('id', id)
        props.handleUpdateLesson(data)
        props.toggle()

    }

    const handleOnChangeInput = (event, index) => {
        switch (index) {
            case 'name':
                setName(event.target.value)
                break;
            case 'idChapter':
                setIdChapter(event.target.value)
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
                    <Form.Select value={idChapter} onChange={handleChange} aria-label="Default select example" id='selectCourse'>
                        {props.courses.map((element) =>
                            <option
                                defaultValue={element[0] == props.idChapter}
                                key={element[0]}
                                value={element[0]}>{element[1]}</option>)}
                    </Form.Select>
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
                <Button variant="primary" onClick={() => {
                    // let data = handleCreateCourse(name, idChapter, img)
                    handleUpdateLesson(name, idChapter, video, id)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalEditLesson;