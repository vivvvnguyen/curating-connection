import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';
import '../css/dashboard.css';
import '../css/global.css';

const Dashboard = ({allCategories, setAllCategories, allUsers, setAllUsers}) => {
    // const{allCategories, setAllCategories, allUsers, setAllUsers} = props;
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    // const deleteHandler = e => {
    //     const id = e.target.id;
    //     console.log(id);
    //     axios.delete("http://localhost:8000/api/connections/" + id)
    //         .then(res => {
    //             const filteredCategories = allCategories.filter(category => category._id !== id);
    //             // goes through all the categories and creates a new array without the deleted category in it
    //             setAllCategories(filteredCategories);
    //         })
    // };
    const handleLogout = () => {
        axios.post("http://localhost:8000/api/logout", null, {withCredentials:true})
            .then(res => {
                navigate('/');
            })
            .catch((err) => {
                console.error("Logout Failed", err);
            })
        
    };
    useEffect(() => {
        axios.get("http://localhost:8000/api/categories")
            .then(res => {
                // console.log(res.data);
                setAllCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    function toggleForm(e){
        e.preventDefault();
        var form = document.getElementById("newCategoryForm");
        form.classList.toggle("visible");
    };
    const newCategoryHandler = e => {
        e.preventDefault();
        const newCategory = {
            name
        };
        axios.post("http://localhost:8000/api/categories", newCategory)
            .then(res => {
                setAllCategories([...allCategories, res.data]);
                console.log(res.data);
                // navigate('/dashboard');
                console.log(allCategories);
            })
            .catch(err => {
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)){
                    errArray.push(err.response.data.errors[key].message)
                };
                setErrors(errArray);
            })
        console.log(allCategories)
    };
    return(
        <div>
            <div>
                {/* <h2>Welcome, Logged In User</h2> */}
                <h2>Welcome to Curating Connection</h2>
                <h3 className='allConnections'>All Connections: </h3>
            </div>
            <div className='dashboardTableContainer'>
                {
                    allCategories.map(category => {
                        return(
                            <table key={category._id} className='dashboardIndivTable'>
                                <thead>
                                    <tr className='dashboardCategoryHeader'>
                                        <th>
                                            {/* <Link to={`/category/${category._id}`}>
                                                <button className='dashboardCategoryBtn'>
                                                    {category.name}
                                                </button>
                                            </Link> */}
                                            {category.name}
                                        </th>
                                        <th>
                                            actions
                                        </th>
                                        {/* <th>{category.connections[1]}</th> */}
                                    </tr>
                                </thead>
                                <tbody className='dashboardTableBody'>
                                    {
                                        // category.connections
                                        category.connections.map(connection => {
                                            return(
                                                <tr key={connection._id} className='dashboardConnectionLinks'>
                                                    <td>
                                                        <Link to={`/connection/${connection._id}`}>
                                                            <button className='dashboardConnectionBtn'>
                                                                {connection.firstName} {connection.lastName}
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/connection/edit/${connection._id}`}>
                                                            <button className='dashboardConnectionEditBtn'>Edit</button>
                                                        </Link>
                                                        {/* <button onClick={deleteHandler}>Delete</button> */}
                                                    </td>
                                                    {/* <td>{connection._id}</td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    })
                }
                {/* <button className='dashboardCreateCategoryBtn' onClick={toggleForm}>Create Category</button>
                <div className='dashboardCreateCategoryContainer' id='newCategoryForm'>
                    <form onSubmit={newCategoryHandler}>
                        <div>
                            <label>Category Name</label>
                            <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <button className='submitBtn' type='submit'>Create</button>
                    </form>
                </div> */}
            </div>
            <div className='dashboardFooter'>
                <button className='logoutBtn' onClick={handleLogout}>Logout</button>
                <Link to="/connection/create">
                    <button className='dashboardCreateConnectionBtn'>Create New Connection</button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;