import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Login from '../components/Login';
import Welcome from '../components/Welcome';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import ConnectionCreate from '../components/ConnectionCreate';
import ConnectionDisplay from '../components/ConnectionDisplay';
import ConnectionEdit from '../components/ConnectionEdit';
import CategoryDisplay from '../components/CategoryDisplay';

const Home = (props) => {
    const[allUsers, setAllUsers] = useState([]);
    const[allCategories, setAllCategories] = useState([]);
    const[allConnections, setAllConnections] = useState([]);

    return(
        <>
            <Routes>
                <Route path={"/"} element={<Welcome/>}/>

                <Route path={"/loginReg"} element={
                    <>
                        <Register allUsers={allUsers} setAllUsers={setAllUsers}></Register>
                        <Login allUsers={allUsers} setAllUsers={setAllUsers}/>
                    </>
                }/>

                <Route path={"/dashboard"} element={<Dashboard allCategories={allCategories} setAllCategories={setAllCategories} allUsers={allUsers} setAllUsers={setAllUsers}/>}/>

                <Route path={"/connection/create"} element={<ConnectionCreate allConnections={allConnections} setAllConnections={setAllConnections} allCategories={allCategories} setAllCategories={setAllCategories}/>}/>

                <Route path={"/connection/:id"} element={<ConnectionDisplay allConnections={allConnections} setAllConnections={setAllConnections}/>}/>

                <Route path={"/connection/edit/:id"} element={<ConnectionEdit allConnections={allConnections} setAllConnections={setAllConnections} allCategories={allCategories} setAllCategories={setAllCategories}/>}/>

                <Route path={"/category/:id"} element={<CategoryDisplay allCategories={allCategories} setAllCategories={setAllCategories}/>}/>
            </Routes>
        </>
    );
}

export default Home;