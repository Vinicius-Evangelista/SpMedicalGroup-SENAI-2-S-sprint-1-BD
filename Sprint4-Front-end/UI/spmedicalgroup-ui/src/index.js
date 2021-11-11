//Components React
import React from 'react';
import ReactDOM from 'react-dom';

//Reac-router-dom
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

//Css
import './style.css';

import reportWebVitals from './reportWebVitals';

//Components
import Login from './pages/login/login.jsx';

//Rotas
const routing =  (
  <Router>
    <div>
      <Routes>
        <Route exact path = "/login" element = {<Login/>}/>
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
