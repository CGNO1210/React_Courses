import { useState } from 'react';
import StickyHeadTableChapters from '../../Components/Table/StickyHeadTableChapters';
import { getAllCoursesApi } from "../../Api/coursesServices";
import Button from 'react-bootstrap/Button';
import { getAllChapters } from '../../Api/chaptersServices';
import ModalChapter from '../../Components/ModalsChapters/ModalChapter';
import { createChapter } from '../../Api/chaptersServices';
import NavCustom from '../../Components/Nav/NavCustom';
import Form from 'react-bootstrap/Form';
import './ManageChapters.css'

const courses = await getAllCoursesApi()
const coursesid = courses.map(course => { return [course.id, course.name] })
const dataRows = await getAllChapters()
const dataColumns = [
    { id: 'idCourse', label: 'Course', maxWidth: 150 },
    { id: 'name', label: 'Name', maxWidth: 150 },
    { id: 'createdAt', label: 'Created At', maxWidth: 50, align: 'center', },
    { id: 'updatedAt', label: 'Updated At', maxWidth: 50, align: 'center', },
    { id: 'action', label: 'Action', maxWidth: 200, align: 'center', }
];

export const ManageChapters = () => {
    const [show, setShow] = useState(false)
    const [rows, setRows] = useState(dataRows)
    const [selectedValue, setSelectedValue] = useState('');
    const handleClose = () => setShow(false);
    const handleCreateChapter = async (data) => {
        let rs = await createChapter(data)
        console.log(rs)
        return rs
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value)
        if (event.target.value == 0) {
            setRows(dataRows)
        } else {
            let rowsByCourse = dataRows.map((element) => element.idCourse == event.target.value && element)
            rowsByCourse = rowsByCourse.filter(item => item !== false);
            setRows(rowsByCourse)
        }
    };

    return (
        <>
            <NavCustom />
            <div className='custom'>
                <Button
                    variant="primary"
                    onClick={() => { setShow(true) }}
                    style={{
                        minWidth: 70
                    }}
                >
                    Add
                </Button>
                <Form.Select value={selectedValue} onChange={handleChange} aria-label="Default select example" id='selectCourse'>
                    <option value="0">Courses Name</option>
                    {coursesid.map((element) => <option key={element[0]} value={element[0]}>{element[1]}</option>)}
                </Form.Select>
            </div>
            <ModalChapter isShow={show} toggle={handleClose} handleCreateChapter={handleCreateChapter} courses={coursesid} />
            <StickyHeadTableChapters columns={dataColumns} rows={rows} courses={coursesid} />
        </>
    )
}