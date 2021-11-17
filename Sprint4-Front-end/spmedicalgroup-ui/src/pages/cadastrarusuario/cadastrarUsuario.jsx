//Hooks
import { useState } from "react";

//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';

//Imagens
import exameMedico from './assets/img/exame.png';

//Css
import '../../style.css';
import axios from "axios";

export default function CadastrarUsuario() {

    //States
    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [Loading, setLoading] = useState(false);

    //Cadastrar consulta
    function EnviarDados(event) {
        event.preventDefault();

        setLoading(true)

        let usuario = {
            idTipoUsuario: idTipoUsuario,
            nome: Nome,
            email: Email,
            senha: Senha
        }

        axios.post('https://localhost:5001/api/usuarios', usuario, {

            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then((resposta) => {
                if (resposta.status === 201) {
                    setLoading(false)
                    console.log('usuario cadastrado !')
                }

            })

            .then(erro => console.log(erro))
    }

    return (

        <div>
            {/* Header */}
            <HeaderLogado />

            {/* Main */}
            <main>
                <hr className="separador" />
                <div className="consulta-main-box container">
                    {/* <!-- Imagem exame --> */}
                    <div className="exame">
                        <img src= {exameMedico} alt="imagem exame" />
                    </div>


                    <div className="form-cadastro-consulta">
                        <h1>Cadastrar Usuario</h1>
                        <div className="form-cadastro-box">
                            <form onSubmit = {EnviarDados} action="">
                                <div className="cadastro-consulta-box">
                                    
                                    <input type="text" className="input-nome-paciente" placeholder="Nome Usuario" 
                                    value = {Nome} onChange = {event => setNome(event.target.value)} />
                                    
                                    <input type="text" className="input-nome-medico" placeholder="Email" 
                                    value = {Email} onChange = {event => setEmail(event.target.value)}/>
                                    
                                    <input type="text" className="input-nome-medico" placeholder="Senha" 
                                    value = {Senha}  onChange = {event => setSenha(event.target.value)}
                                    />

                                    <div className="data-e-situacao">
                                        <select value = {idTipoUsuario} onChange = {event => setIdTipoUsuario(event.target.value)} name="idTipoUsuario" className="campo-situacao">
                                            <option value="0">Tipo Usuario</option>
                                            <option value="1">Paciente</option>
                                            <option value="2">Médico</option>
                                            <option value="3">Administrador</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-cadastro-button">
                                    <button type = "submit" className="cadastro-consulta-cadastrar">cadastrar</button>
                                    <button className="cadastro-consulta-cancelar">cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <FooterLogado />
        </div>


    );

}