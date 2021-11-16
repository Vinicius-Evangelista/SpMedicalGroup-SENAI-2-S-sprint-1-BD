import React from 'react'

//Css
import "../../style.css"

export default function FooterLogin() {
    return (
        <div>
            <footer>
                <hr className="separador" />
                {/* <!-- Grid --> */}
                <div className="footer-container container">

                    {/* <!-- Links-footer --> */}
                    <div className="box-lists">
                        <ul className="links-footer">

                            <li className="header-list">Central de atendimento</li>
                            <li className="lista-links"><a href="">Política de privacidade</a></li>
                            <li className="lista-links"><a href="">Termo de uso</a></li>
                            <li className="lista-links"><a href="">Ajuda</a></li>
                        </ul>
                    </div>

                    {/* <!-- Middle box footer --> */}
                    <div className="box-direitos">
                        <a className="text-logo-footer">SpMedicalGroup</a>
                        <small className="direitos">©2021 SpMedicalGroup.Todos os direitos reservados.</small>
                    </div>

                    {/* <!-- Box footer links --> */}
                    <div className="box-footer-links">
                        <ul className="links-footer">
                            <li className="header-list">Páginas</li>
                            <li className="lista-links"><a href="">Meu Perfil</a></li>
                            <li className="lista-links"><a href="">Início</a></li>
                        </ul>

                    </div>
                </div>
            </footer>
        </div>
    );
}