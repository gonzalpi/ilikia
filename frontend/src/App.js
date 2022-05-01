import './App.css'
import React from 'react';
import {GridLogin} from './loginScreen/GridLogin';
import { Menu } from './menu';
import {MainScreenAdmin} from './mainScreen/admin/MainScreenAdmin';
import Blank from './Blank'
import {ErrorPage} from './ErrorPage'
import AppLayout from './layout/AppLayout'

import {Evaluation} from './evaluation/Minimental.js';
import {

  BrowserRouter as Router,
  Route,
  Routes,
  Link

} from "react-router-dom";

function App() {
  return (

    <Router>
        <Routes>


          {/* <Route exact path='/' element = {<GridLogin />}/> // Raiz login screen */}

          <Route path="/" element = {<AppLayout/>}>


            <Route exact path="/menu" element = {<MainScreenAdmin/>} />
            {/* <Route exact path="menu/examen" element = {<Blank/>} />
            <Route exact path="menu/mainAdmin" element = {<Blank/>} /> */}


          </Route>



          <Route path='*' element={<ErrorPage/>} />

        </Routes>
    </Router>
    );
}

export default App;
