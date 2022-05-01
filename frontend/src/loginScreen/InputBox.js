import React from 'react';
import './InputBox.css';

function InputBox(props) {

    return (

        <input className='InputBox' placeholder={props}/>

    );

}

export {InputBox};