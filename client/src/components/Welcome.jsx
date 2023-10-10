import React from 'react';
import {Link} from 'react-router-dom';
import '../css/welcome.css';
import '../css/global.css'

const Welcome = (props) => {
    return(
        <>
            <div className='welcomeContainer'>
                <div className='welcome'>
                    <h1>Curating Connection</h1>
                    <Link to={"/loginReg"}>
                        <button className='welcomeBtn'>Let's Get Started!</button>
                    </Link>
                </div>
                <div id='shape-1' className='scale-up-center'></div>
                <div id='shape-2'className='scale-up-center'></div>
                <div id='shape-3'className='scale-up-center'></div>
            </div>
        </>
    );
}

export default Welcome;