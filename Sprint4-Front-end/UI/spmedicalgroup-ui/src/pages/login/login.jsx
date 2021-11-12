//Hooks
import { useEffect, useState } from 'react';
import axios from 'axios';

//Imagens
import medico from './assets/img/medico.png';
import logoLogin from './assets/img/SPMG-logo-login.png';

//Components
import HeaderLogin from '../../components/headers/headerLogin';
import FoooterLogin from '../../components/footers/footerLogin'

//Css
import "../../style.css";

export default function Login() {

    //States
    const [senha, setSenha] = useState('12345678');
    const [email, setEmail] = useState('ligia@gmail.com');
    const [validacao, setValidacao] = useState(false);
    
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
                localStorage.setItem('usuario-login', resposta.data.token);
                setValidacao(false);

                let base64 = localStorage.getItem('usuario-login').split('.')[1];         
                
                //exibindo o base64 do login.
                console.log(base64);

                console.log('foi');
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