import { useState } from 'react';
import StickyHeadTableCourses from '../../Components/Table/StickyHeadTableCourses';
import Button from 'react-bootstrap/Button';
import ModalCourse from '../../Components/ModalsCourses/ModalCourse';
import { createCourse, getAllCoursesApi } from '../../Api/coursesServices';
import NavCustom from '../../Components/Nav/NavCustom';
import './ManageCourses.css'

const dataRows = await getAllCoursesApi()
const dataColumns = [
    { id: 'name', label: 'Name', maxWidth: 150 },
    { id: 'description', label: 'Description', maxWidth: 150 },
    { id: 'img', label: 'Image', maxWidth: 100, align: 'center', },
    { id: 'createdAt', label: 'Created At', maxWidth: 50, align: 'center', },
    { id: 'updatedAt', label: 'Updated At', maxWidth: 50, align: 'center', },
    { id: 'action', label: 'Action', maxWidth: 200, align: 'center', }
];

export const ManageCourses = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleCreateCourse = async (data) => {
        let rs = await createCourse(data)
        return rs
    }

    return (
        <>
            <NavCustom />
            <div className='custom'>
                <Button
                    variant="primary"
                    onClick={() => { setShow(true) }}
                    style={{ minWidth: 70 }}>
                    Add
                </Button>
            </div>
            <ModalCourse isShow={show} toggle={handleClose} handleCreateCourse={handleCreateCourse} />
            <StickyHeadTableCourses columns={dataColumns} rows={dataRows} />
        </>
    )
}