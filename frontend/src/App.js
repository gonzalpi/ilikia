import React from 'react';
import {GridLogin} from './loginScreen/GridLogin';
import { Menu } from './menu';
import {ErrorPage} from './ErrorPage'

import {Evaluation} from './evaluation/Minimental';
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

          <Route exact path="/" element = {<GridLogin/>} />
          <Route exact path="/menu" element = {<Menu/>} />
          <Route exact path="/examen" element = {<Evaluation/>} />
          <Route path='*' element={<ErrorPage/>} />

        </Routes>
    </Router>
    );
}

export default App;
