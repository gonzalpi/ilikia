import React, { Component } from 'react';
import {useNavigate} from "react-router-dom";

function Menu() {

    let navigate = useNavigate();

    return (

        <div>

            <h1 style={{

            position: "relative",
            marginTop: "10%",
            width: "100%",
            height: "auto",

            fontFamily: 'Montserrat',
            fontStyle: "normal",
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '4em',
            lineHeight: "73px",
            /* display: flex; */
            alignItems: "center",

            color: "#556500"

            }}


            >Hola</h1>

            <button style={{

            backgroundColor: "#D7EC7C",
            padding: "5%",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            width: "50%", 
            margin: "auto",
            marginTop: "8%",
            borderRadius: "40px",
            fontFamily: 'Montserrat',
            fontWeight: '700',
            fontSize: '1.5em',
            border: "none",
            cursor: "pointer"

            }} onClick= { () => {

                navigate("/examen")

            }} >Minimental </button>
            
            <br/>

        </div>


        

    );

}

export {Menu}