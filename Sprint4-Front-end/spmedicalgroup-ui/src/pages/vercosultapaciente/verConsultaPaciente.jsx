//Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router";


//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';

//Imagens
import medica from './assets/img/medica.png'

//Css
import "../../style.css";
import axios from "axios";

export default function VerMinhasConsulta() {

    //pegando o id da url
    const [ConsultaPaciente, setConsultaPaciente] = useState([]);



    async function BuscarMinhasConsultas() {

        await axios('https://620556ad161670001741b92d.mockapi.io/agendamento/1', {

            //passando o token que já foi atribuido no login
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    //atribuindo ao state
                    setConsultaPaciente(resposta.data);

                }

            })

            .catch(erro => console.log(erro))


    }

    useEffect(BuscarMinhasConsultas, []);

    return (

        <div>

            {/* Header */}
            <HeaderLogado />

            <main>
                <hr className="separador" />

                <div className="login-main-box container">

                    {/* <!-- MEDICA --> */}

                    <div className="medica">
                        <img src={medica} alt="imagem-médica" />
                    </div>

                    {/* <!-- CONSULTA --> */}
                    <div className="container-consultas">
                        <h1>Consultas</h1>


                        {
                                <div key = {ConsultaPaciente.idAgendamento} className="consultas-box">
                                    <div className="titulo-tipo-medico">
                                        <div className="consultas-separador"></div>
                                        <span>Clínicos Geral</span>
                                        <div className="consultas-separador"></div>
                                    </div>



                                    <div className="consulta-dados">

                                        {/* <!-- NOME PACIENTE --> */}

                                        <div className="nome-paciente">
                                            <span>Nome paciente:</span>
                                            <span className="nome">{ConsultaPaciente.idProntuario[0].nome}</span>
                                        </div>
                                        <div className="separador-dados"></div>

                                        {/* <!-- NOME MÉDICO --> */}
                                        <div className="nome-medico">
                                            <span>Nome do médico:</span>
                                            <span className="medico">{ConsultaPaciente.idMedicoNavigation[0].nomeMedico}</span>
                                        </div>
                                        <div className="separador-dados"></div>


                                        <div className="situacao-e-data">

                                            {/* <!-- SITUAÇÃO --> */}
                                            <div className="nome-situacao">
                                                <div className="separador-situacao-data">{ConsultaPaciente.idSituacao[0].estadoConsulta}</div>
                                            </div>

                                            {/* Horario */}
                                            <div className="nome-data">
                                                {/* <div className="situacao-e-data-box">
                                                    <span>Horario:</span>
                                                    <span className="data">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)).split(' ')[1]}h</span>
                                                </div> */}
                                                <div className="separador-situacao-data"></div>
                                            </div>

                                            {/* <!-- DATA --> */}
                                            <div className="nome-data">
                                                {/* <div className="situacao-e-data-box">
                                                    <span>Data:</span>
                                                    <span className="data">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)).split(' ')[0]}</span> */}
                                                {/* </div> */}
                                                <div className="separador-situacao-data"></div>
                                            </div>

                                           

                                        </div>
                                    </div>

                                    {/* <!-- DESCRIÇÃO --> */}
                                    <form action="">
                                        <div className="box-button">
                                            <textarea name="" id="" cols="30" rows="10" placeholder="Coloque a descrição..." value = {ConsultaPaciente.descricao} disabled></textarea>
                                            <button type="submit">atualizar</button>
                                        </div>
                                    </form>
                                </div>
                            
                        })


                    </div>

                </div>
            </main>

            {/* Footer */}
            <FooterLogado />
        </div>
    );
}