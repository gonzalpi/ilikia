import React, { Component } from 'react';
import './GridLogin.css';
import {GridInputBox} from './GridInputBox';
import {WelcomeText} from './WelcomeText';
import {useNavigate} from "react-router-dom";
import logo from './ilikia.svg';

function GridLogin() {

    let navigate = useNavigate();

    return (

        <div className='GridLogin'>
            
            {/* <img src={logo} width={"82"} height={"82"}/> */}

            <h1 style={{

                fontSize: "4em",
                fontFamily: "Montserrat",
                color: "#556500"


            }}>Ilikia</h1>
            {/* <WelcomeText/> */}
            
            <p style={{

                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "2em",

            }}>Usuario / Cédula</p>
            
            <GridInputBox/>

            {/* <p style={{

                marginTop: "5%",
                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "2em",

            }}>Contraseña</p>

            <input type={"password"} style={{

                textAlign: "left",
                fontFamily: 'Montserrat',
                fontWeight: "700",
                fontSize: "2em",
                color: "rgba(25, 29, 8, 0.8)",
                borderRadius: "40px",
                padding: "5%",
                marginTop: "3%",
                backgroundColor: "#E1E5C3",
                border: "none"

            }}/> */}

            <button style={{

                backgroundColor: "#D7EC7C",
                width: "50%",
                height: "4.5em", 
                margin: "auto",
                marginTop: "8%",
                borderRadius: "40px",
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fontSize: '1.3em',
                textAlign: 'center',
                border: "none",
                color: "#3D4719",
                cursor: "pointer"

            }} onClick= { () => {
                
                navigate("/menu")

            }}> Continuar </button>

        </div>

    );

}

export {GridLogin}