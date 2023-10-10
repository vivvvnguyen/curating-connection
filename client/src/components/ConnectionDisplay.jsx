import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ConnectionDisplay = (props) => {
    const {id} = useParams();
    const[oneConnection, setOneConnection] = useState({});
    const{allConnections, setAllConnections} = props;
    const[categoryName, setCategoryName] = useState("");
    const navigate = useNavigate();

    const formatDate = (inputDate) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/connections/" + id)
            .then(res => {
                // console.log(res.data);
                setOneConnection(res.data);
                // Fetch and set category name
                axios.get(`http://localhost:8000/api/categories/${res.data.category}`)
                    .then(categoryResult => {
                        setCategoryName(categoryResult.data);
                        // console.log(categoryResult.data.category.name);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [id]);

    const deleteHandler = e => {
        const id = e.target.getAttribute("data-id");
        console.log(id);
        axios.delete("http://localhost:8000/api/connections/" + id)
            .then(res => {
                const filteredConnections = allConnections.filter(connection => connection._id !== id);
                // goes through all the connections and creates a new array without the deleted connection in it
                setAllConnections(filteredConnections);
                navigate('/dashboard');
            })
    };

    return(
        <>
            <h2>{oneConnection.firstName} {oneConnection.lastName}</h2>
            <div className='connectionDisplayBody'>
                <div className='connectionDisplayCol'>
                    <div>
                        <p className='connectionDisplayLabel'>Birthday: </p>
                        <p className='connectionDisplayInfo'>{formatDate(oneConnection.birthday)}</p>
                    </div>
                    <div>
                        <p className='connectionDisplayLabel'>Contact Information: </p>
                        <p className='connectionDisplayInfo'>{oneConnection.contactInfo}</p>
                    </div>
                </div>
                <div className='connectionDisplayCol'>
                    <div>
                        <p className='connectionDisplayLabel'>Allergies: </p>
                        <p className='connectionDisplayInfo'>{oneConnection.allergies}</p>
                    </div>
                    <div>
                        <p className='connectionDisplayLabel'>Gift Idea: </p>
                        <p className='connectionDisplayInfo'>{oneConnection.giftIdeas}</p>
                    </div>
                    <div>
                        <p className='connectionDisplayLabel'>Notes: </p>
                        <p className='connectionDisplayInfo'>{oneConnection.notes}</p>
                    </div>
                </div>
            </div>
            {/* <p>{categoryName.category.name}</p> */}
            <div className='connectionDisplayFooter'>
                <Link to={"/dashboard"}>
                    <button className='backBtn'>Back to Dashboard</button>
                </Link>
                <Link to={`/connection/edit/${id}`}>
                    <button className='submitBtn'>Edit Connection</button>
                </Link>
                <button data-id={oneConnection._id} onClick={deleteHandler} className='deleteBtn'>Delete</button>
            </div>
            
        </>
    );
}

export default ConnectionDisplay;