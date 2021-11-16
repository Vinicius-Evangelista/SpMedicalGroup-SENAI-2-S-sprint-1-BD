//Hooks
import { useState, useEffect } from "react";

//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';

//Imagens
import exameMedico from './assets/img/exame.png';

//Css
import '../../style.css';
import axios from "axios";

export default function CadastrarConsulta() {

    //States
    const[descricao, setDescricao] = useState('');
    const[dataConsulta, setDataEvento] = useState(new Date());
    const[idSituacao, setSituacao] = useState(0);
    const[idProntuario, setIdPaciente] = useState(0);
    const[idMedico, setIdMedico] = useState(0);
    const[Loading, setLoading] = useState(false);

    //Listas
    const[listaMedicos, setListasMedico] = useState([]);
    const[listaPacientes, setListaPacientes] = useState([]);
    const[listaSitucao, setListaSituacao] = useState([]);



    //Buscar medicos
    function buscarMedicos(){
        axios.get('https://localhost:5001/api/usuarios/listar/medicos', {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')            }
        })

        .then((resposta) => {
            if(resposta.status === 200){
                setListasMedico(resposta.data)
                console.log(resposta.data)
            }
        })

        .then(erro => console.log(erro))
    }


    //buscar pacientes
    function buscarPacientes(){
        axios('https://localhost:5001/api/usuarios/listar/pacientes', {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')            }
        })

        .then((resposta) => {
            if(resposta.status === 200){
                setListaPacientes(resposta.data)
                console.log(resposta.data)
            }
        })

        .then(erro => console.log(erro))
    }
    

    //buscar Clinica
    function buscarSituacao(){
        axios.get('https://localhost:5001/api/usuarios/listar/medicos', {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('usuario-login')            }
        })

        .then((resposta) => {
            if(resposta.status === 200){
                setListaSituacao(resposta.data)
                console.log(resposta.data)
            }
        })

        .then(erro => console.log(erro))
    }


    //Cadastrar consulta
    function CadastrarConsulta(event){

        event.PreventDefault();
        setLoading(true)

        let consulta = {
            idMedico : idMedico,
            idProntuario : idProntuario,
            idSituacao : idSituacao,
            descricao : descricao,
            dataConsulta : dataConsulta
        }

        axios.post('https://localhost:5001/api/usuarios/admin', consulta, {

        headers: {
            Authorization : 'Bearer ' + localStorage.getItem('usuario-login')
        }
        })

        .then((resposta) => {
            if(resposta.status === 200){
                setLoading(false)
                console.log('consulta cadastrada')
            }
            
        })

        .then(erro => console.log(erro))
    }

    //Ciclos de vida
    useEffect(buscarPacientes,[]);
    useEffect(buscarSituacao,[]);
    useEffect(buscarMedicos,[]);

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
                            <form onSubmit = {CadastrarConsulta}>
                                <div className="cadastro-consulta-box">

                                    {/* select para ver todos o pacientes possíveis pegando com um select */}
                                    
                                    {/* Pacientes */}

                                    <select
                                    name = "idProntuario"
                                    value = {listaPacientes.idProntuario}
                                    className="input-nome-paciente" 
                                    placeholder="Nome Paciente" 
                                    onChange = {(event) => setIdPaciente( event.target.value)} 
                                    />
                                        <option value = "0">Selecione o tema do evento.</option>

                                        {listaPacientes.map((paciente) => {
                                            

                                            return(
                                                        
                                                <option key = {paciente.idPaciente} value= {paciente.idPaciente}>
                                                    {listaPacientes.idUsuarioNavigation.nome}
                                                </option>
                                            );
                                        })}
                                    <select/>

                                    <input type="text" className="input-nome-medico" placeholder="Nome do médico" />

                                    <div className="data-e-situacao">
                                        <select name="" id="" className="campo-situacao">
                                            <option value="0">Situacao</option>
                                        </select>
                                        <input className="input-data" type="datetime-local" />
                                    </div>
                                    <textarea name="" id="" cols="30" rows="10" className="descricao-cadastro-consulta" placeholder="Coloque a descrição..."></textarea>
                                </div>
                                <div className="form-cadastro-button">
                                    <button className="cadastro-consulta-cadastrar">cadastrar</button>
                                    <button className="cadastro-consulta-cancelar">cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <FooterLogado/>
        </div>


    );

}