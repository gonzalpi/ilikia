import './App.css'
import React from 'react';
import {MainScreenAdmin} from './mainScreen/MainScreenAdmin';
import {ErrorPage} from './ErrorPage'
import AppLayout from './layout/AppLayout'
import { Settings } from './settings';
import { ExamenResultados } from './mainScreen/examenResultados';
import {GridLogin} from './loginScreen/GridLogin'
import Minimental from './evaluation/Minimental.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>

          {/* Login screen */}
          <Route exact path='/' element = {<GridLogin />}/>

          {/* Admin screen with sidebar layout */}
          <Route path="/" element = {<AppLayout/>}>

            {/* Menu with all exams available to doctor */}
            <Route path="/menu" element = {<MainScreenAdmin/>} />

            {/* Exam results */}
            <Route path='menu/examenResultados/:id' element = {<ExamenResultados/>} />

            {/* Config screen: tutorials, log out */}
            <Route path="/config" element = {<Settings/>} />

          </Route>

          {/* Exam application */}
          <Route path='/minimental/:personal/:paciente/:medico/:tipo' element = {<Minimental/>}/>

          {/* Error page for all remaining routes */}
          <Route path='*' element={<ErrorPage/>} />

        </Routes>
    </Router>
    );
}

export default App;
