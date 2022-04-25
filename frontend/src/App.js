import React from 'react';
import { InputBox } from './InputBox';
import { WelcomeText } from './WelcomeText';
import {GridLogin} from './GridLogin';
import { Menu } from './menu';

import {Evaluation} from './evaluation/Minimental';
import {

  BrowserRouter as Router,
  Switch,
  Route,
  Link

} from "react-router-dom";

function App() {
  return (

    <Router>
      <React.Fragment>
        <Switch>


          <Route path="/examen">
            
            <Evaluation/>

          </Route>

          <Route path="/menu">
            <Menu/>
          </Route>

          <Route path="/">
            <GridLogin/>
          </Route>



        </Switch>
      </React.Fragment>
    </Router>
    );
}

export default App;
