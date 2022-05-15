import React, { Component, useState, useEffect } from 'react';
import './GridLogin.css';
import {GridInputBox} from './GridInputBox';
import {WelcomeText} from './WelcomeText';
import {useNavigate} from "react-router-dom";
import logo from './ilikia.svg';

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
            

            <h1 style={{

                fontSize: "4em",
                fontFamily: "Montserrat",
                color: "#556500",
                margin: "0"


            }}>Ilikia</h1>
            
            <p style={{

                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "2em",

            }}>Usuario</p>
            
            <input style={{

                textAlign: "left",
                position: "sticky",
                color: "rgb(25, 29, 8, 0.8)",
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "2em",
                borderRadius: "40px",
                padding: "4%",
                backgroundColor: "#E1E5C3",
                border: 'none'

            }} value={input} onInput= {e => setInput(e.target.value)}/>

            <p style={{

                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "2em",

            }}>Contraseña</p>

            <input style={{

                textAlign: "left",
                position: "sticky",
                color: "rgb(25, 29, 8, 0.8)",
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "2em",
                borderRadius: "40px",
                padding: "4%",
                backgroundColor: "#E1E5C3",
                border: 'none',
                marginBottom: "3%"

            }} type="password"/>


            <button style={{

                backgroundColor: "#D7EC7C",
                width: "50%",
                height: "4.5em", 
                margin: "auto",
                // marginTop: "8%",
                borderRadius: "40px",
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fontSize: '1.3em',
                textAlign: 'center',
                border: "none",
                color: "#3D4719",
                cursor: "pointer"

            }} onClick= { () => {
                
                console.log(user, personal, input, medico)
                if (user == 0) {

                    navigate("/minimental/" + personal + "/" + input + "/" + medico + "/1")

                } else if (user == 1) {

                    navigate("/menu")
                
                }


            }}> Continuar </button>

        </div>

    );

}

export {GridLogin}