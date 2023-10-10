import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/logReg.css';

const Register = ({allUsers, setAllUsers}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const newUserHandler = e => {
        e.preventDefault();
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            confirmPW
        };
        // if passwords match and email is unique + other validations met, then create account
        axios.post("http://localhost:8000/api/register", newUser, {withCredentials:true})
            .then(res => {
                // console.log(res.data)
                setAllUsers([...allUsers, res.data]);
                navigate(`/dashboard`);
            })
            .catch(err => {
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)){
                    errArray.push(err.response.data.errors[key].message)
                };
                setErrors(errArray);
                console.log(err)
            })
    }

    return(
        <div className='logReg-column'>
            <form onSubmit={newUserHandler}>
                <div>
                    <h2>Register</h2>
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
                <div>
                    <label>First Name: </label>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type='password' value={confirmPW} onChange={e => setConfirmPW(e.target.value)}/>
                </div>
                <div className='logRegBtnBar'>
                    <Link to={"/"}>
                        <button className='backBtn'>Back</button>
                    </Link>
                    <button className='submitBtn'>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;