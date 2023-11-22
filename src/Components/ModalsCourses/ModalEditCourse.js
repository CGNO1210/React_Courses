import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';

// import './ModalEditCourse.css'

function ModalEditCourse(props) {
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [img, setImg] = useState()
    const [imgUrl, setImgUrl] = useState(props.img)
    const [id, setId] = useState(props.id)
    const handleClose = () => {
        props.toggle()
    }

    const handleUpdateCourse = (name, description, img, id) => {
        if (!name || !description || !img || !id) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', img);
        formData.append('id', id);
        props.handleUpdateCourse(formData)
        props.toggle()

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
                let selectedImage = event.target.files[0]
                if (selectedImage) {
                    // Đọc file ảnh
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      // Lưu dữ liệu ảnh vào state để hiển thị trên giao diện
                      setImgUrl(event.target.result);
                    };
                    reader.readAsDataURL(selectedImage); // Đọc file ảnh dưới dạng base64
                  }
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
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => { handleOnChangeInput(event, 'description') }}
                        value={description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <img src={imgUrl} alt='' style={{
                        maxWidth: 400
                    }} />
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
                <Button variant="primary" onClick={() => {
                    // let data = handleCreateCourse(name, description, img)
                    handleUpdateCourse(name, description, img, id)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal >
    );
}

export default ModalEditCourse;