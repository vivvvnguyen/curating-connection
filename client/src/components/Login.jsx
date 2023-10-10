import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/logReg.css';

const Login = ({allUsers, setAllUsers}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const loginHandler = e => {
        e.preventDefault();
        const loginData = {
            email,
            password
        };
        axios.post("http://localhost:8000/api/login", loginData, {withCredentials:true})
            .then(res => {
                console.log("Logged In Successfully!")
                navigate(`/dashboard`);
            })
            .catch(err => {
                const errArray = [];
                // console.log("Login Error");
                // console.log(err)
                errArray.push(err.response.data.errors);
                // for (const key of Object.keys(err.response.data.errors)){
                //     errArray.push(err.response.data.errors)
                // };
                setErrors(errArray);
            })
    }
    return(
        <div className='logReg-column'>
            <form onSubmit={loginHandler}>
                <div>
                    {/* <h2>Login</h2>
                    <p><Link to={"/"}>Back</Link></p> */}
                </div>
            {/* Display validation errors for user */}
                <div style={{color: "red"}}>
                    {
                        errors.map((err, idx) => {
                            return (
                                <p key={idx}>{err}</p>
                            )
                        })
                    }
                </div>
                <h2>Login</h2>
                <div>
                    <label>Email: </label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type='submit' className='submitBtn'>Login</button>
            </form>
        </div>
    );
}

export default Login;