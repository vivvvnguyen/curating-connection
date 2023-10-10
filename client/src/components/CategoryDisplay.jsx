import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const CategoryDisplay = (props) => {
    const {id} = useParams();
    const[oneCategory, setOneCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/catgeories/" + id)
            .then(res => {
                console.log(res.data)
                setOneCategory(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    return(
        <>
            <h2>{oneCategory.name} Connection</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Info</th>
                        <th>Birthday</th>
                        <th>Allergies</th>
                        <th>Gift Ideas</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {
                        oneCategory.connections.map(connection => {
                            return (
                                <tr key={connection._id}>
                                    <td>{connection.firstName}</td>
                                </tr>
                            )
                        })
                    }
                </tbody> */}
            </table>
        </>
    );
}

export default CategoryDisplay;