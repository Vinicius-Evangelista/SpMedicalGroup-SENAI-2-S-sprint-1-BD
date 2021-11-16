//Hooks
import { useEffect, useState } from 'react';

//Bibliotecas React 
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';

//Css
import '../../style.css';


export default function MinhasConsultas() {

    //States
    const [listaConsultas, setlistaConsultas] = useState([]);


    function BuscarMinhasConsutas() {

        axios('https://localhost:5001/api/prontuarios/listar', {

            //passando o token que já foi atribuido no login
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    //atribuindo ao state
                    setlistaConsultas(resposta.data)
                }

            }
            )

    }

    //Hook Ciclo de vida : Efeito, causa
    useEffect(BuscarMinhasConsutas, []);

    return (
        <div>

            {/* Header */}
            <HeaderLogado />


            <main>
                <div className="ver-consultas-main-box container">
                    <div className="consultas-container">
                        <div className="box-consultas">
                            <h1>Minhas Consultas</h1>

                            {listaConsultas.map((consulta) => {
                                return (
                                    <div key = {consulta.idAgendamento} className="consulta">
                                            <span className="tipo-medico">Clínico Geral</span>
                                        <div className="box-dados-consulta">
                                            <div className="consulta-dados">
                                                <span>Data: {Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)).split(' ')[0]}</span>
                                                <span>Horário: {Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataConsulta)).split(' ')[1]}h</span>
                                                <span>Situacão: {consulta.idSituacaoNavigation.estadoSituacao}</span>
                                            </div>

                                            <Link className="button-ver-consulta" to = {`/verminhasconsultas/${consulta.idAgendamento}`}>
                                                Ver Consulta
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <FooterLogado />

        </div>
    );
}
