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

export default function CadastrarUsuario() {

    //pegando o id da url
    const { id } = useParams();
    const [ConsultasMedico, setConsultaMedico] = useState([]);
    const [descricao, setDescricao] = useState('');

    function BuscarConsultasMedico() {

        axios('https://localhost:5001/api/medicos/listar/' + id, {

            //passando o token que já foi atribuido no login
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    //atribuindo ao state
                    setConsultaMedico(resposta.data);
                    setDescricao(resposta.data[0].descricao);
                }

            })

            .catch(erro => console.log(erro))


    }

    function AtualizarDescricao(event){

        console.log(id)
        event.preventDefault();

        axios.patch('https://localhost:5001/api/medicos/' + id, { descricao : descricao}, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 201)
            {
                console.log('foi');
            }
        })

        .catch( erro => console.log(erro))
    }

    useEffect(BuscarConsultasMedico, []);

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


                        {ConsultasMedico.map((consulta) => {
                            return (
                                <div key={consulta.idAgendamento} className="consultas-box">
                                    <div className="titulo-tipo-medico">
                                        <div className="consultas-separador"></div>
                                        <span>Clínicos Geral</span>
                                        <div className="consultas-separador"></div>
                                    </div>



                                    <div className="consulta-dados">

                                        {/* <!-- NOME PACIENTE --> */}

                                        <div className="nome-paciente">
                                            <span>Nome paciente:</span>
                                            <span className="nome">{consulta.idProntuarioNavigation.idUsuarioNavigation.nome}</span>
                                        </div>
                                        <div className="separador-dados"></div>

                                        {/* <!-- NOME MÉDICO --> */}
                                        <div className="nome-medico">
                                            <span>Nome do médico:</span>
                                            <span className="medico">{consulta.idMedicoNavigation.nomeMedico}</span>
                                        </div>
                                        <div className="separador-dados"></div>


                                        <div className="situacao-e-data">

                                            {/* <!-- SITUAÇÃO --> */}
                                            <div className="nome-situacao">
                                                <div className="situacao-e-data-box">
                                                    <span>Situação:</span>
                                                    <span className="situacao">{consulta.idSituacaoNavigation.estadoSituacao}</span>
                                                </div>
                                                <div className="separador-situacao-data"></div>
                                            </div>

                                            {/* Horario */}
                                            <div className="nome-data">
                                                <div className="situacao-e-data-box">
                                                    <span>Horario:</span>
                                                    <span className="data">{Intl.DateTimeFormat("pt-BR", {
                                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                                        hour: 'numeric', minute: 'numeric', hour12: true
                                                    }).format(new Date(consulta.dataConsulta)).split(' ')[1]}h</span>
                                                </div>
                                                <div className="separador-situacao-data"></div>
                                            </div>

                                            {/* <!-- DATA --> */}
                                            <div className="nome-data">
                                                <div className="situacao-e-data-box">
                                                    <span>Data:</span>
                                                    <span className="data">{Intl.DateTimeFormat("pt-BR", {
                                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                                        hour: 'numeric', minute: 'numeric', hour12: true
                                                    }).format(new Date(consulta.dataConsulta)).split(' ')[0]}</span>
                                                </div>
                                                <div className="separador-situacao-data"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- DESCRIÇÃO --> */}
                                    <form onSubmit = {AtualizarDescricao}>
                                        <div className="box-button">
                                            <textarea name="" id="" cols="30" rows="10" placeholder="Coloque a descrição..." value = {descricao} onChange = {event => setDescricao(event.target.value)}></textarea>
                                            <button type="submit">atualizar</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        })}


                    </div>

                </div>
            </main>

            {/* Footer */}
            <FooterLogado />
        </div>
    );
}