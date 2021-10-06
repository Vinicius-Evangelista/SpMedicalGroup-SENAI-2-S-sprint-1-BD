
using Microsoft.AspNetCore.Http;
using SpMedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Interfaces
{
    /// <summary>
    /// interfaces reponsável por Usuario
    /// </summary>
    interface IUsuarioRepository
    {
        /// <summary>
        /// Cadastra um novo usuario
        /// </summary>
        /// <param name="novoUsuario">Objeto com as informações do novo usuário</param>
        void CadastrarUsuario(Usuario novoUsuario);

        /// <summary>
        /// Casdastra um novo agendamento
        /// </summary>
        /// <param name="novoAgendamento">Objeto com as informações do novo agendamento</param>
        void Agendar(Agendamento novoAgendamento);

        /// <summary>
        /// Cancela um Agendamento
        /// </summary>
        /// <param name="idConsulta">id da Consulta que será cancelada</param>
        void CancelarAgendamento(int idConsulta);

        /// <summary>
        /// Cadastra uma nova clínica
        /// </summary>
        /// <param name="novaClinica">Objeto com as novas Clinas</param>
        void CadastrarClinica(Clinica novaClinica);

        /// <summary>
        /// Lista todas as consultas
        /// </summary>
        /// <returns>uma lista de consultas</returns>
        List<Agendamento> ListarAgendamentos();

        /// <summary>
        /// lista todos os prontuarios
        /// </summary>
        /// <returns>uma lista de prontuarios</returns>
        List<Prontuario> ListarProntuarios();

        /// <summary>
        /// lista todos o medicos
        /// </summary>
        /// <returns> uma lista de médicos</returns>
        List<Medico> ListarMedicos();

        /// <summary>
        /// verifica a foto de perfil de um usuario
        /// </summary>
        /// <param name="id_usuario">id do usuario que será requisitado</param>
        /// <returns>a foto de perfil de um usuário</returns>
        string ConsultaPerfil(int id_usuario);

        /// <summary>
        /// salve a foto de perfil no banco de dados
        /// </summary>
        /// <param name="foto">foto enviada</param>
        /// <param name="id_usuario">id do usuario que a enviou</param>
        void SalvarPerfilBD(IFormFile foto, int id_usuario);

        /// <summary>
        /// Verifica se há um usuário existente
        /// </summary>
        /// <param name="senha">senha do usuario</param>
        /// <param name="email">email do usuario</param>
        /// <returns>Um token com as informações de acesso do usuairo</returns>
        Usuario Login(string senha, string email);
        
    }
}
