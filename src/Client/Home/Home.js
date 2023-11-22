import NavCustom from '../../Components/Nav/NavCustom';
import { getAllCoursesApi } from '../../Api/coursesServices';
import { useState } from "react";
import CardCustom from '../../Components/Card/CardCustom';
import { Pagination } from 'react-bootstrap';
import './Home.css'

const itemsPerPage = 8; // Số lượng card mỗi trang

const dataRows = await getAllCoursesApi()
export const Home = () => {
    const [courses, setCourses] = useState(dataRows)
    const [currentPage, setCurrentPage] = useState(1);

    // Tính chỉ số của card bắt đầu và kết thúc trên từng trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataRows.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <NavCustom />
            <div className='list_courses'>
                {currentItems.map((course) => {
                    return <CardCustom key={course.id} idCourse={course.id} description={course.description} name={course.name} img={course.img} />
                })}
            </div>
            <div className='pagination'>
                <Pagination>
                    {[...Array(Math.ceil(dataRows.length / itemsPerPage)).keys()].map((pageNumber) => (
                        <Pagination.Item key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)} active={Math.ceil(indexOfLastItem/itemsPerPage) === pageNumber+1}>
                            {pageNumber + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </>
    )
}