import './App.css'
import React from 'react';
import {GridLogin} from './loginScreen/GridLogin';
import { Menu } from './menu';
import {MainScreenAdmin} from './mainScreen/MainScreenAdmin';
import Blank from './Blank'
import {ErrorPage} from './ErrorPage'
import AppLayout from './layout/AppLayout'
import { Settings } from './settings';

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


            <Route path="/menu" element = {<MainScreenAdmin/>} />
            <Route path="/config" element = {<Settings/>} />


          </Route>



          <Route path='*' element={<ErrorPage/>} />

        </Routes>
    </Router>
    );
}

export default App;
