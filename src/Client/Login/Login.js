import './Login.css';
import $ from "jquery";
import { loginApi, signUpApi } from '../../Api/usersServices';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const navigate = useNavigate();


    const toggleLogin = () => {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    }

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            toast.error('Missing input', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        let data = await loginApi(email, password)
        if (data.errCode !== 0) {
            toast.error(data.errMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else {
            sessionStorage.setItem('token', data.token.accessToken)
            navigate('/');
        }
    }

    const handleSignUp = async (firstName, lastName, email, password) => {
        if (!firstName || !lastName || !email || !password) {
            toast.error(data.errMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        let data = await signUpApi(firstName, lastName, email, password)
        if (data.errCode !== 0) {
            toast.error(data.errMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else {
            toast.success('Account created successfully', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleChangeInput = (event, index) => {
        switch (index) {
            case 'email':
                setEmail(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
            case 'firstName':
                setFirstName(event.target.value)
                break;
            case 'lastName':
                setLastName(event.target.value)
                break;
            case 'emailRegister':
                setEmailRegister(event.target.value)
                break;
            case 'passwordRegister':
                setPasswordRegister(event.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <div className='abc'>
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input
                            type="text"
                            placeholder="first name"
                            name='firstName'
                            value={firstName}
                            onChange={(event) => handleChangeInput(event, 'firstName',)} />
                        <input
                            type="text"
                            placeholder="last name"
                            name='lastName'
                            value={lastName}
                            onChange={(event) => handleChangeInput(event, 'lastName',)} />
                        <input
                            type="text"
                            placeholder="email address"
                            name='emailRegister'
                            value={emailRegister}
                            onChange={(event) => handleChangeInput(event, 'emailRegister',)} />
                        <input
                            type="password"
                            placeholder="password"
                            name='passwordRegister'
                            value={passwordRegister}
                            onChange={(event) => handleChangeInput(event, 'passwordRegister')} />
                        <button type='button' onClick={() => handleSignUp(firstName, lastName, emailRegister, passwordRegister)}>create</button>
                        <p className="message">Already registered? <a href="#" onClick={() => toggleLogin()}>Sign In</a></p>
                        <p className="message"><a href="/" >Goto Homepage</a></p>
                    </form>
                    <form className="login-form">
                        <input
                            type="text"
                            placeholder="username"
                            name='email'
                            value={email}
                            onChange={(event) => handleChangeInput(event, 'email',)} />
                        <input
                            type="password"
                            placeholder="password"
                            name='password'
                            value={password}
                            onChange={(event) => handleChangeInput(event, 'password',)} />
                        <button type='button' onClick={() => handleLogin(email, password)}>login</button>
                        <p className="message">Not registered? <a href="#" onClick={() => toggleLogin()}>Create an account</a></p>
                        <p className="message"><a href="/" >Goto Homepage</a></p>
                    </form>
                </div>
                <ToastContainer />

            </div>
        </div>
    );
}