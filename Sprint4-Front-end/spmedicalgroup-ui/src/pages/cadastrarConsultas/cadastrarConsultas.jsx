//Hooks
import { useState, useEffect } from "react";

//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';
import { Link } from 'react-router-dom';

//Imagens
import exameMedico from './assets/img/exame.png';
import IconMap from './assets/img/map-icon.png'

//Css
import '../../style.css';
import axios from "axios";

export default function CadastrarConsulta() {

    //States
    const [dataConsulta, setDataConsuta] = useState(new Date());
    const [idSituacao, setSituacao] = useState(0);
    const [idProntuario, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [Loading, setLoading] = useState(false);
    //Listas
    const [listaMedicos, setListasMedico] = useState([]);
    const [listaPacientes, setListaPacientes] = useState([]);



    //Buscar medicos
    function buscarMedicos() {
        axios.get('http://localhost:5001/api/usuarios/listar/medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListasMedico(resposta.data)
                }
            })

            .then(erro => console.log(erro))
    }


    //buscar pacientes
    function buscarPacientes() {
        axios('http://localhost:5001/api/usuarios/listar/pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data)

                }
            })

            .then(erro => console.log(erro))
    }

    //Cadastrar consulta
    function FazerAgendamento(event) {
        event.preventDefault();

        setLoading(true)

        let consulta = {
            idMedico: idMedico,
            idProntuario: idProntuario,
            idSituacao: idSituacao,
            dataConsulta: new Date(dataConsulta)
        }

        axios.post('http://localhost:5001/api/usuarios/admin', consulta, {

            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then((resposta) => {
                if (resposta.status === 201) {
                    setLoading(false)
                    console.log('consulta cadastrada')
                }

            })

            .then(erro => console.log(erro))
    }

    //Ciclos de vida
    useEffect(buscarPacientes, []);
    useEffect(buscarMedicos, []);

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
                        <img src={exameMedico} alt="imagem exame" />
                    </div>


                    <div className="form-cadastro-consulta">
                        <h1>Cadastro de Consultas</h1>
                        <div className="form-cadastro-box">
                            <form onSubmit={FazerAgendamento}>
                                <div className="cadastro-consulta-box">

                                    {/* select para ver todos o pacientes possíveis pegando com um select */}

                                    {/* Cadastrar selecionar o prontuario */}

                                    {/* Quando nós clicarmos no select ele vai exibir todas opções (options) */}
                                    <select
                                        name="idProntuario"
                                        value={idProntuario}
                                        className="input-nome-paciente"
                                        onChange={(event) => setIdPaciente(event.target.value)}
                                        required
                                    >
                                        <option value="0">Selecione o nome do paciente</option>

                                        {listaPacientes.map((paciente) => {
                                            return (

                                                <option key={paciente.idProntuario} value={paciente.idProntuario}>
                                                    {paciente.idUsuarioNavigation.nome}
                                                </option>
                                            );
                                        })}

                                    </select>


                                    {/* Select médicos */}
                                    <select
                                        name="idMedico"
                                        value={idMedico}
                                        className="input-nome-medico"
                                        onChange={event => setIdMedico(event.target.value)}
                                        required
                                    >

                                        <option value="0">Selecione o médico</option>

                                        {listaMedicos.map((medico) => {
                                            return (

                                                <option key={medico.idMedico} value={medico.idMedico}>
                                                    {medico.nomeMedico}
                                                </option>
                                            );
                                        })}
                                    </select>


                                    <div className="data-e-situacao">

                                        {/* Select Situacao */}

                                        <select name="idSituacao"
                                            value={idSituacao}
                                            onChange={event => setSituacao(event.target.value)}
                                            className="campo-situacao"
                                            required
                                        >
                                            <option value="0">Situacao</option>
                                            <option value="1">Realizada</option>
                                            <option value="2">Cancelada</option>
                                            <option value="3">Agendada</option>
                                        </select>
                                        <input className="input-data" type="datetime-local"

                                            name="dataConsuta"
                                            value={dataConsulta}
                                            onChange={(event) => setDataConsuta(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <textarea name="descricao" id="" cols="30" rows="10" className="descricao-cadastro-consulta" value="A descrição será colocada pelo médico." disabled />
                                </div>
                                <div className="form-cadastro-button">
                                    <button type="submit" className="cadastro-consulta-cadastrar">cadastrar</button>
                                    <button className="cadastro-consulta-cancelar">cancelar</button>
                                </div>
                            </form>
                        </div>

                        <div className="ver-localizacao-box">
                            <img src={IconMap} alt=" icone mapa" />
                            <Link className="ver-localizacao-button" to={'/mapas'}>
                                Ver Localização
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <FooterLogado />
        </div>


    );

}