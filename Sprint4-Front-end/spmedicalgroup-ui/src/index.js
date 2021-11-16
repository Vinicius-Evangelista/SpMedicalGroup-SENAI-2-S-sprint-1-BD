//Bibliotecas React
import React from 'react';
import ReactDOM from 'react-dom';

//Reac-router-dom
import {
  Route,
  BrowserRouter as Router,
  Navigate,
  Routes
} from 'react-router-dom';

//Css
import './style.css';

//Serviços
import { parseJwt, usuarioAutenticado } from './services/auth';


//Components
import Login from './pages/login/login.jsx';
import CadastrarConsulta from './pages/cadastrarConsultas/cadastrarConsultas';
import MinhasConsultas from './pages/minhasconsultas/minhasConsultas';
import MinhasConsultasMedico from './pages/minhasconsultasmedico/minhasConsultaMedico';
import VerMinhasConsulta from './pages/vercosultapaciente/verConsultaPaciente';
import AdicionarDescricao from './pages/adicionardescricao/adicionardescricao.jsx';


import reportWebVitals from './reportWebVitals';



//Permissões

//Children : "filho" (CadastrarConsulta) que está dentro do PermissaoAdm.
const PermissaoPaciente = ({ children }) => {
  return( 
    usuarioAutenticado() && parseJwt().role === '1' ?
     children : <Navigate to="/login" /> 
  );
}

const PermissaoMedico = ({ children }) => {
  return( 
    usuarioAutenticado() && parseJwt().role === '2' ?
     children : <Navigate to="/login" /> 
  );
}

const PermissaoAdm = ({ children }) => {
  return( 
    usuarioAutenticado() && parseJwt().role === '3' ?
     children : <Navigate to="/login" /> 
  );
}


//Rotas
const routing = (
  <Router>
    <div>
      <Routes>
        <Route path="minhasconsultas" element={<PermissaoPaciente><MinhasConsultas/></PermissaoPaciente>} />
        <Route path="login" element={<Login />}/>
        <Route path="verminhasconsultas/:id" element={<PermissaoPaciente><VerMinhasConsulta/></PermissaoPaciente>}/>
        <Route path="adicionardescricao/:id" element={<PermissaoMedico><AdicionarDescricao/></PermissaoMedico>}/>
        <Route path="minhasconsultasmedico" element={<PermissaoMedico><MinhasConsultasMedico/></PermissaoMedico>} />
        <Route path="cadastrarconsultas" element={<PermissaoAdm>
          <CadastrarConsulta />
          </PermissaoAdm>} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
