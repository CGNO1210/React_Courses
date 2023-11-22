import ReactDOM from 'react-dom/client';
import { Login } from './Client/Login/Login';
import { ManageCourses } from './Admin/ManageCourses/ManageCourses';
import { ManageChapters } from "./Admin/ManageChapters/ManageChapters";
import { ManageLessons } from "./Admin/ManageLessons/ManageLessons";
import { Home } from "./Client/Home/Home";
import { Learn } from './Client/Learn/Learn';
import './index.css';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// const Home = () => <div>Trang chủ</div>;
const App = () => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        // Lấy token từ sessionStorage
        const token = sessionStorage.getItem('token') || null;

        // Kiểm tra xem token có tồn tại không
        if (token) {
            try {
                // Giải mã token
                const decodedToken = jwtDecode(token);

                // Lưu thông tin từ token vào state
                setIsAdmin(decodedToken.data.isAdmin);
            } catch (error) {
                console.error('Error decoding JWT:', error);
                // Xử lý lỗi khi giải mã token
            }
        } {
            setIsAdmin(0)
        }
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin/courses"
                    element={
                        isAdmin == 1 ? (
                            <ManageCourses />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/admin/chapters"
                    element={
                        isAdmin == 1 ? (
                            <ManageChapters />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/admin/lessons"
                    element={
                        isAdmin == 1 ? (
                            <ManageLessons />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/course/:courseId" element={<Learn />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
