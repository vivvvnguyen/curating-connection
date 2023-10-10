import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/connection.css';

const ConnectionCreate = ({allConnections, setAllConnections, allCategories, setAllCategories}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [allergies, setAllergies] = useState("");
    const [giftIdeas, setGiftIdeas] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/categories")
            .then((res) => {
                // console.log(res.data);
                setAllCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const newConnectionHandler = e => {
        e.preventDefault();
        const newConnection = {
            firstName,
            lastName, 
            birthday,
            contactInfo,
            allergies,
            giftIdeas,
            notes,
            category: category || null,
        };
        axios.post("http://localhost:8000/api/connections", newConnection)
            .then(res => {
                setAllConnections([...allConnections, res.data]);
                console.log(res.data);
                // navigate(`/connection/${res.data._id}`) // redirect to the display page
                navigate('/dashboard');
            })
            .catch(err => {
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)){
                    errArray.push(err.response.data.errors[key].message)
                };
                setErrors(errArray);
                // console.log(err)
            })
    }
    return(
        <>
            <form onSubmit={newConnectionHandler}>
                <div>
                    <h2>Create a New Connection!</h2>
                    <Link to={"/dashboard"}>
                        <button className='backBtn'>Back to Dashboard</button>
                    </Link>
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
                <div className='connectionCreateFormBody'>
                    <div>
                        <label>First Name: </label>
                        <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div >
                        <label>Last Name: </label>
                        <input type='text' value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Birthday: </label>
                        <input type='date' value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    </div>
                    <div>
                        <label>Contact Information: </label>
                        <input type='text' value={contactInfo} onChange={e => setContactInfo(e.target.value)}/>
                    </div>
                    <div>
                        <label>Allergies: </label>
                        <input type='text' value={allergies} onChange={e => setAllergies(e.target.value)}/>
                    </div>
                    <div>
                        <label>Gift Ideas: </label>
                        <input type='text' value={giftIdeas} onChange={e => setGiftIdeas(e.target.value)}/>
                    </div>
                    <div>
                        <label>Notes: </label>
                        <input type='text' value={notes} onChange={e => setNotes(e.target.value)}/>
                    </div>
                    <div>
                        <label>Category: </label>
                        {/* <input type='text' value={category} onChange={e => setCategory(e.target.value)}/> */}
                        <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Select a Category</option>
                            {
                                allCategories.map((category) => {
                                    return (
                                        <option value={category._id} key={category._id}>{category.name}</option>
                                    )
                                }) 
                            }
                        </select>
                    </div>
                    <button className='submitBtn'>Register</button>
                </div>
            </form>
        </>
    );
}

export default ConnectionCreate;