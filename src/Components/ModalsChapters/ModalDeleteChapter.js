import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ModalDeleteChapter.css'

function ModalDeleteChapter(props) {
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }

    const handleDeleteChapter = (id) => {
        props.handleDeleteChapter(id)
    }

    return (
        <Modal show={props.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn chắc chắn muốn xóa
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={async () => {
                    handleDeleteChapter(id)
                    props.toggle()
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalDeleteChapter;