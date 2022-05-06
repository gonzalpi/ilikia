import React, { Component, useState, useEffect } from 'react';
import './GridLogin.css';
import {GridInputBox} from './GridInputBox';
import {WelcomeText} from './WelcomeText';
import {useNavigate} from "react-router-dom";
import logo from './ilikia.svg';

function GridLogin() {

    let navigate = useNavigate();

    // var user = 0;

    const [input, setInput] = useState('');

    const [exams, setExams] = useState(null);
    console.log(input)

    const [user, setUser] = useState(null);
    const fetchUser = () => {

      fetch("/api/usertype?usuario=" + input)
        .then(res => res.json())
        .then(data => {
            
          setUser(data.tipo)
          console.log(data.tipo)
          console.log(data)
          console.log(input)
        //   return data.tipo
        })

    };


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
                
                fetchUser()
                if (user == 0) {

                    navigate("/minimental/" + "ajh" + "/" + input + "/pog/1")

                } else if (user == 1) {

                    navigate("/menu")
                
                }
                // } else {

                //     alert("Usuario no existente, verifique sus datos")

                // }

                // paciente 0 | doctor 1 | nein -1


            }}> Continuar </button>

        </div>

    );

}

export {GridLogin}