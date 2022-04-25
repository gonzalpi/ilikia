import React, { Component } from 'react';
import './GridLogin.css';
import {GridInputBox} from './GridInputBox';
import {WelcomeText} from './WelcomeText';
import {useHistory} from "react-router-dom";

class Login extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

}

function GridLogin() {

    const history = useHistory();
    const menu = () => {
        history.push("/menu")
        window.location.reload();
    }

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

            }} onClick= {menu} >Iniciar sesión</button>

        </div>

    );

}

export {GridLogin}