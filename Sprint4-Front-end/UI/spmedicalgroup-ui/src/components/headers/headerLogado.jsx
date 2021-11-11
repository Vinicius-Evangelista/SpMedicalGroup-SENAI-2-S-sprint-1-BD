import React from 'react';

//Imagens
import logoHeader from './assets/img/SPMG-logo-header.png'
import userIcon from './assets/img/user-icon.png'


//Css
import '.../pages/index.css'

export default function HeaderLogado() {
    return (
        <div>
            <header>
                <div className="box-header container">

                    {/* <!-- Logo --> */}
                    <div className="logo">
                        <img src={logoHeader} alt="SpMedicalGroup logo" />
                    </div>

                    {/* <!-- Nav --> */}
                    <nav className="nav-header">

                        <a href="" className="links">início</a>
                        <a href="" className="links">sobre nós</a>
                        <a href="" className="links">consultas</a>
                        <a href="" className="links">serviços</a>

                        {/* <!-- Separated buttons --> */}
                        <div className="login-buttons">
                            <a href="" className="links-login"><img className="user-icon" src={userIcon} /> Meu
                                Perfil</a>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}