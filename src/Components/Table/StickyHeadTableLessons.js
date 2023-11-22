import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ModalDeleteLesson from '../ModalsLessons/ModalDeleteLesson';
import Button from 'react-bootstrap/Button';
import { getAllChapters } from "../../Api/chaptersServices";
import { deleteLesson, updateLesson } from '../../Api/lessonsServices';
import ModalEditLesson from '../ModalsLessons/ModalEditLesson';



const chapters = await getAllChapters()
const chaptersid = chapters.map(chapter => { return [chapter.id, chapter.name] })
export default function StickyHeadTableLessons(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = React.useState(false)
    const [name, setName] = React.useState('')
    const [idChapter, setidChapter] = React.useState('')
    const [id, setId] = React.useState('')
    const [showDelete, setShowDelete] = React.useState(false)

    const getChapterName = (val) => {
        let rs = ''
        props.chapters.forEach(element => {
            if (element[0] == val) {
                rs = element[1]
            }
        });
        return rs
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowDelete(false);

    const showModalEditLesson = (row) => {
        setName(row.name)
        setidChapter(row.idChapter)
        setId(row.id)
        setShow(true)
    }
    const showModalDeleteLesson = (row) => {
        setId(row.id)
        setShowDelete(true)
    }
    const handleUpdateLesson = async (data) => {
        let rs = await updateLesson(data)
        console.log('check update lesson', rs)
        return rs
    }
    const handleDeleteLesson = async (id) => {
        let rs = await deleteLesson(id)
        console.log('check delete chapter', rs)
        return rs
    }
    return (
        <Paper sx={{
            width: '80%',
            overflow: 'hidden',
            margin: 'auto',
        }}>
            <TableContainer sx={{ height: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: 50,
                                        maxWidth: column.maxWidth
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {props.columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'id') {
                                                return
                                            }
                                            if (column.id === 'action') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Button variant="warning" onClick={() => showModalEditLesson(row)}>Edit</Button>{' '}
                                                        <Button variant="danger" onClick={() => showModalDeleteLesson(row)}>Delete</Button>
                                                    </TableCell>
                                                )
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align} style={{
                                                    maxWidth: column.maxWidth,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {/* {value} */}
                                                    {column.id === 'idChapter' ? getChapterName(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {show && <ModalEditLesson
                isShow={show}
                name={name}
                idChapter={idChapter}
                id={id}
                toggle={handleClose}
                courses={chaptersid}
                handleUpdateLesson={handleUpdateLesson} />}
            {showDelete && <ModalDeleteLesson
                isShow={showDelete}
                id={id}
                handleDeleteLesson={handleDeleteLesson}
                toggle={handleCloseDelete}

            ></ModalDeleteLesson>}
        </Paper>
    );
}