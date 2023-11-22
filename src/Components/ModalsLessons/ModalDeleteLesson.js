import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ModalDeleteLesson.css'

function ModalDeleteLesson(props) {
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }

    const handleDeleteLesson = (id) => {
        props.handleDeleteLesson(id)
    }

    return (
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn chắc chắn muốn xóa
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={async () => {
                    handleDeleteLesson(id)
                    props.toggle()
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalDeleteLesson;