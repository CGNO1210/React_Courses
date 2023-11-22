import { useState } from 'react';
import StickyHeadTableLessons from '../../Components/Table/StickyHeadTableLessons';
import { getAllChapters } from "../../Api/chaptersServices";
import Button from 'react-bootstrap/Button';
import ModalLesson from "../../Components/ModalsLessons/ModalLesson";
import { createLesson, getAllLessons } from '../../Api/lessonsServices';
import NavCustom from '../../Components/Nav/NavCustom';
import Form from 'react-bootstrap/Form';
import './ManageLessons.css'

const chapters = await getAllChapters()
const dataRows = await getAllLessons()
const chaptersid = chapters.map(chapter => { return [chapter.id, chapter.name] })
const dataColumns = [
    { id: 'idChapter', label: 'Chapter', maxWidth: 150 },
    { id: 'name', label: 'Name', maxWidth: 150 },
    { id: 'createdAt', label: 'Created At', maxWidth: 50, align: 'center', },
    { id: 'updatedAt', label: 'Updated At', maxWidth: 50, align: 'center', },
    { id: 'action', label: 'Action', maxWidth: 200, align: 'center', }
];

export const ManageLessons = () => {
    const [show, setShow] = useState(false)
    const [rows, setRows] = useState(dataRows)
    const [selectedValue, setSelectedValue] = useState('');
    const handleClose = () => setShow(false);
    const handleCreateLesson = async (data) => {
        let rs = await createLesson(data)
        return rs
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value == 0) {
            setRows(dataRows)
        } else {
            let rowsByChapter = dataRows.map((element) => element.idChapter == event.target.value && element)
            rowsByChapter = rowsByChapter.filter(item => item !== false);
            setRows(rowsByChapter)
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
                    <option value="0">Chapter Name</option>
                    {chaptersid.map((element) => <option key={element[0]} value={element[0]}>{element[1]}</option>)}
                </Form.Select>
            </div>
            <ModalLesson isShow={show} toggle={handleClose} handleCreateLesson={handleCreateLesson} chapters={chaptersid} />
            <StickyHeadTableLessons columns={dataColumns} rows={rows} chapters={chaptersid} />
        </>
    )
}