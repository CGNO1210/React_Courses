import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ModalCourse.css'

function ModalCourse(props) {
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }

    const handleDeleteCourse = (id) => {
        props.handleDeleteCourse(id)
    }

    return (
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn chắc chắn muốn xóa
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={async () => {
                    handleDeleteCourse(id)
                    props.toggle()
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalCourse;