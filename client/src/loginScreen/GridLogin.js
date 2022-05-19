import React, { useState, useEffect } from 'react';
import './GridLogin.css';
import {useNavigate} from "react-router-dom";

function GridLogin() {
    let navigate = useNavigate();

    // Username input state and hook
    const [input, setInput] = useState('');

    // Users states and hook (to pass onto next page)
    const [user, setUser] = useState(null);
    const [medico, setMedico] = useState(null);
    const [personal, setPersonal] = useState(null);

    // Fetch user data as it is being typed (ideally done only when attempting to log in)
    useEffect(() => {if (input.length > 0) fetchUser()}, [input]);

    // Fetch user type
    async function fetchUserType(usuario)
    {
        const res = await fetch("/api/usertype?usuario=" + usuario);
        const usertype_json = await res.json();
        return usertype_json.tipo;
    }
    // Fetch staff in charge of patient
    async function fetchStaff(usuario)
    {
        const res = await fetch("api/staff?usuario=" + usuario);
        const staff = await res.json();
        return staff;
    }
    // Fetch user data
    const fetchUser = () => {
        // Store user type in user
        fetchUserType(input)
        .then(data => setUser(data));
        // Assign staff to medico (doctor) and personal (other medical staff) accordingly
        fetchStaff(input)
        .then(data => {
            for (let i = 0; i < data.length; i++)
            {
                fetchUserType(data[i].usuario_personal)
                .then(usertype => {
                    if (usertype == 1)
                        setMedico(data[i].usuario_personal);
                    else
                        setPersonal(data[i].usuario_personal);
                });
            }
        });
    }


    return (

        <div className='GridLogin'>
            
            <h1 className='gl-title'>Ilikia</h1>

            <p className='gl-text'>Usuario</p>
            <input className='gl-input' value={input} onInput= {e => setInput(e.target.value)}/>

            <p className='gl-text'>Contraseña</p>
            <input className='gl-input' style={{marginBottom: "3%"}} type="password"/>

            <button className='gl-button'
            onClick={() => {
                if (user == 0)
                    // Navigate to Exam application if user is patient
                    navigate("/minimental/" + personal + "/" + input + "/" + medico + "/1");
                else if (user == 1)
                    // Navigate to Admin screen if user is doctor
                    navigate("/menu");
            }}> Continuar </button>

        </div>

    );

}

export {GridLogin}