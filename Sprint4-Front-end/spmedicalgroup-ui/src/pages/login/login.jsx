//Hooks
import {  useState } from 'react';
import { useNavigate} from "react-router-dom";

//Bibliotecas React
import axios from 'axios';

//Serviços
import { parseJwt } from '../../services/auth';

//Components
import HeaderLogin from '../../components/headers/headerLogin';
import FoooterLogin from '../../components/footers/footerLogin';

//Imagens
import medico from './assets/img/medico.png';
import logoLogin from './assets/img/SPMG-logo-login.png';

//Css
import "../../style.css";

export default function Login() {

    //States
    const [email, setEmail] = useState('henrique@gmail.com');
    const [senha, setSenha] = useState('12345678');
    const [validacao, setValidacao] = useState(false);
    var navigate = useNavigate();    

    function FazerLogin(event){

        setValidacao(true)

        //tirando função padrão da página
        event.preventDefault();

        //chamando api
        axios.post('https://localhost:5001/api/login/login', {
            email: email,
            senha: senha
        })

        .then( (resposta) => {

            //adicionando token no local Storage
            if(resposta.status === 200){

                //adicionando token no localStorage do navegador
                localStorage.setItem('usuario-login', resposta.data.token);
                setValidacao(false);

                console.log(parseJwt().role);
                

                // Redirecionamento conforme o tipo do usuário.
                if(parseJwt().role === '1'){
                    navigate("/minhasconsultas")
                }else if (parseJwt().role === '2'){
                    navigate("/minhasconsultasmedico")
                }else if(parseJwt().role === '3'){
                    navigate("/cadastrarconsultas")
                }else{
                    navigate("/")
                }
            }

        }
        )

        .catch(erro => console.log(erro))
    }



    return (
        <div>
            {/* Header */}

            <HeaderLogin />


            {/* <!-- Main --> */}
            <main>
                <hr className="separador" />

                <div className="main-box container">
                    


                    {/* <!-- Enfermeira --> */}
                    <div className="form-box">

                        {/* <!-- Logo Login --> */}
                        <div className="logo-login">
                            <img src={logoLogin} alt="" />
                        </div>
                        <span className="text-logo">SpMedicalGroup</span>


                        {/* <!-- Form --> */}
                        <form onSubmit = {FazerLogin} action="" className="login">

                            {/* <!-- Email --> */}
                            <label ></label>
                            <input type="text"

                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Email" value = {email} className="email" />

                            {/* <!-- Senha --> */}
                            <label ></label>
                            <input type="text" placeholder="Senha" value = {senha} 
                            onChange = {(event) => setSenha(event.target.value)}
                            className="senha" />

                            {/* <!-- Botão --> */}
                            <button type ="submit" className="form-button">Entrar</button>
                        </form>
                        <div className="box-cadastrar">
                            <span className="span-cadastrar">Não tem uma conta?</span>
                            <a href="">Cadastre-se.</a>
                        </div>

                    </div>

                    {/* <!-- Medico  --> */}
                    <div className="medico-img">
                        <img src={medico} alt="" />
                    </div>
                </div>
            </main>

            {/* Footer */}
                <FoooterLogin />

        </div>
    );
}