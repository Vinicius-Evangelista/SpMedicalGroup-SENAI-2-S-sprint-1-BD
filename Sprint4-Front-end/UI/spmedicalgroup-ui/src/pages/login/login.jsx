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
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');




    return (
        <div>
            {/* Header */}
            <header>
                <HeaderLogin />
            </header>


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
                        <form action="" className="login">

                            {/* <!-- Email --> */}
                            <label ></label>
                            <input type="text"

                                onChange={(event) => (setEmail(event.target.value))}

                                placeholder="Email" className="email" />

                            {/* <!-- Senha --> */}
                            <label ></label>
                            <input type="text" placeholder="Senha" className="senha" />

                            {/* <!-- Botão --> */}
                            <button className="form-button">Entrar</button>
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
            <footer>
                <FoooterLogin/>
            </footer>
        </div>
    );
}