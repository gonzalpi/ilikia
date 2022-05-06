import './App.css'
import React from 'react';
import {MainScreenAdmin} from './mainScreen/MainScreenAdmin';
import {ErrorPage} from './ErrorPage'
import AppLayout from './layout/AppLayout'
import { Settings } from './settings';
import { ExamenResultados } from './mainScreen/examenResultados';
import { Pencil } from './unity/pencil'
import { Pentagons } from './unity/pentagons'
import {GridLogin} from './loginScreen/GridLogin'
import Evaluation from './evaluation/Minimental.js';
import {

  BrowserRouter as Router,
  Route,
  Routes,
  Link

} from "react-router-dom";
import { ExamenesPacientes } from './mainScreen/examenesPacientes';

function App() {
  return (
    <Evaluation/>
    // <Router>
    //     <Routes>


    //       <Route exact path='/' element = {<GridLogin />}/> // Raiz login screen

    //       <Route path="/" element = {<AppLayout/>}>

  
    //         <Route path="/menu" element = {<MainScreenAdmin/>} />
    //         <Route path="/config" element = {<Settings/>} />
            
    //         <Route path='menu/examenResultados/:id' element = {<ExamenResultados/>} />
    //         <Route path='/unity' element = {<Pencil/>}/>
    //         <Route path='/unity2' element = {<Pentagons/>}/>


    //       </Route>

    //       {/* <Route path='menu/examenesPacientes/:id' element = {<ExamenesPacientes/>} /> */}

    //       <Route path='*' element={<ErrorPage/>} />

    //     </Routes>
    // </Router>
    );
}

export default App;
