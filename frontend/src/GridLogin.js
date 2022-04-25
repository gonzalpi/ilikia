import React, { Component } from 'react';
import './GridLogin.css';
import {GridInputBox} from './GridInputBox';
import {WelcomeText} from './WelcomeText';
import {useNavigate} from "react-router-dom";

function GridLogin() {

    let navigate = useNavigate();

    return (

        <div className='GridLogin'>
            
            <WelcomeText/>
            <p style={{

                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "1.5em"

            }}>Usuario / Cédula</p>
            
            <GridInputBox/>
            <p style={{

                marginTop: "5%",
                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "1.5em",

            }}>Contraseña</p>

            <input type={"password"} style={{

                textAlign: "left",
                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "1.5em",
                color: "rgba(25, 29, 8, 0.8)",
                borderRadius: "40px",
                padding: "5%",
                marginTop: "3%",
                backgroundColor: "#E1E5C3",
                border: "none"

            }}/>

            <button style={{

                backgroundColor: "#D7EC7C",
                padding: "5%",
                width: "50%", 
                margin: "auto",
                marginTop: "8%",
                borderRadius: "40px",
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fontSize: '1.5em',
                border: "none"

            }} onClick= { () => {
                
                navigate("/menu")

            }}> Iniciar sesión </button>

        </div>

    );

}

export {GridLogin}