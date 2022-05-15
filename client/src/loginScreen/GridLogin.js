import React, { Component, useState, useEffect } from 'react';
import './GridLogin.css';
import {useNavigate} from "react-router-dom";

function GridLogin() {

    let navigate = useNavigate();

    const [input, setInput] = useState('');
    console.log(input)

    const [user, setUser] = useState(null);
    const [medico, setMedico] = useState(null);
    {
        
    }
    const [personal, setPersonal] = useState(null);

    useEffect(() => {if (input.length > 0) fetchUser()}, [input]);

    async function fetchUserType(usuario)
    {
        const res = await fetch("/api/usertype?usuario=" + usuario);
        const usertype_json = await res.json();
        return usertype_json.tipo;
    }
    async function fetchStaff(usuario)
    {
        const res = await fetch("api/staff?usuario=" + usuario);
        const staff = await res.json();
        return staff;
    }
    const fetchUser = () => {
        fetchUserType(input)
        .then(data => setUser(data));
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
                    navigate("/minimental/" + personal + "/" + input + "/" + medico + "/1");
                else if (user == 1)
                    navigate("/menu");
            }}> Continuar </button>

        </div>

    );

}

export {GridLogin}