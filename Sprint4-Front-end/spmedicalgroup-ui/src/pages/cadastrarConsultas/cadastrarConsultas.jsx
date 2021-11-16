//Hooks
import { useState, useEffect } from "react";

//Components
import HeaderLogado from '../../components/headers/headerLogado.jsx';
import FooterLogado from '../../components/footers/footerLogado.jsx';

//Imagens
import exameMedico from './assets/img/exame.png';

//Css
import '../../style.css';

export default function CadastrarConsulta() {

    return (
        
        <div>
            {/* Header */}
            <HeaderLogado />

            {/* Main */}
            <main>
                <hr class="separador" />
                <div class="consulta-main-box container">
                    {/* <!-- Imagem exame --> */}
                    <div class="exame">
                        <img src={exameMedico} alt="imagem exame" />
                    </div>


                    <div class="form-cadastro-consulta">
                        <h1>Cadastro de Consultas</h1>
                        <div class="form-cadastro-box">
                            <form action="">
                                <div class="cadastro-consulta-box">
                                    <input type="text" class="input-nome-paciente" placeholder="Nome Paciente" />
                                    <input type="text" class="input-nome-medico" placeholder="Nome do médico" />

                                    <div class="data-e-situacao">
                                        <select name="" id="" class="campo-situacao">
                                            <option value="0">Situacao</option>
                                        </select>
                                        <input class="input-data" type="date" />
                                    </div>
                                    <textarea name="" id="" cols="30" rows="10" class="descricao-cadastro-consulta" placeholder="Coloque a descrição..."></textarea>
                                </div>
                                <div class="form-cadastro-button">
                                    <button class="cadastro-consulta-cadastrar">cadastrar</button>
                                    <button class="cadastro-consulta-cancelar">cancelar</button>
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