import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ModalEditCourse from '../ModalsCourses/ModalEditCourse';
import ModalDeleteCourse from '../ModalsCourses/ModalDeleteCourse';
import Button from 'react-bootstrap/Button';
import { updateCourse, deleteCourse } from '../../Api/coursesServices';

export default function StickyHeadTableCourses(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = React.useState(false)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [img, setImg] = React.useState('')
    const [id, setId] = React.useState('')
    const [showDelete, setShowDelete] = React.useState(false)



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowDelete(false);

    const showModalEditCourse = (row) => {
        setName(row.name)
        setDescription(row.description)
        setImg(row.img)
        setId(row.id)
        setShow(true)
    }
    const showModalDeleteCourse = (row) => {
        setId(row.id)
        setShowDelete(true)
    }
    const handleUpdateCourse = async (data) => {
        let rs = await updateCourse(data)
        console.log('check update course', rs)
        return rs
    }
    const handleDeleteCourse = async (id) => {
        let rs = await deleteCourse(id)
        console.log('check delete course', rs)
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
                                                        <Button variant="warning" onClick={() => showModalEditCourse(row)}>Edit</Button>{' '}
                                                        <Button variant="danger" onClick={() => showModalDeleteCourse(row)}>Delete</Button>
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
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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
            {show && <ModalEditCourse
                isShow={show}
                name={name}
                description={description}
                img={img}
                id={id}
                toggle={handleClose}
                handleUpdateCourse={handleUpdateCourse} />}
            {showDelete && <ModalDeleteCourse
                isShow={showDelete}
                id={id}
                handleDeleteCourse={handleDeleteCourse}
                toggle={handleCloseDelete}
            ></ModalDeleteCourse>}
        </Paper>
    );
}