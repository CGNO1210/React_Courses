import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ModalEditChapter from '../ModalsChapters/ModalEditChapter';
import ModalDeleteChapter from '../ModalsChapters/ModalDeleteChapter';
import Button from 'react-bootstrap/Button';
import { getAllCoursesApi } from '../../Api/coursesServices';
import { updateChapter,deleteChapter } from "../../Api/chaptersServices";



const courses = await getAllCoursesApi()
const coursesid = courses.map(course => { return [course.id, course.name] })
export default function StickyHeadTableCourses(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = React.useState(false)
    const [name, setName] = React.useState('')
    const [idCourse, setidCourse] = React.useState('')
    const [id, setId] = React.useState('')
    const [showDelete, setShowDelete] = React.useState(false)

    const getCourseName = (val) => {
        let rs = ''
        props.courses.forEach(element => {
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

    const showModalEditChapter = (row) => {
        setName(row.name)
        setidCourse(row.idCourse)
        setId(row.id)
        setShow(true)
    }
    const showModalDeleteChapter = (row) => {
        setId(row.id)
        setShowDelete(true)
    }
    const handleUpdateChapter = async (data) => {
        let rs = await updateChapter(data)
        console.log('check update chapter', rs)
        return rs
    }
    const handleDeleteChapter = async (id) => {
        let rs = await deleteChapter(id)
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
                                                        <Button variant="warning" onClick={() => showModalEditChapter(row)}>Edit</Button>{' '}
                                                        <Button variant="danger" onClick={() => showModalDeleteChapter(row)}>Delete</Button>
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
                                                    {column.id === 'idCourse' ? getCourseName(value) : value}
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
            {show && <ModalEditChapter
                isShow={show}
                name={name}
                idCourse={idCourse}
                id={id}
                toggle={handleClose}
                courses={coursesid}
                handleUpdateChapter={handleUpdateChapter} />}
            {showDelete && <ModalDeleteChapter
                isShow={showDelete}
                id={id}
                handleDeleteChapter={handleDeleteChapter}
                toggle={handleCloseDelete}

            ></ModalDeleteChapter>}
        </Paper>
    );
}