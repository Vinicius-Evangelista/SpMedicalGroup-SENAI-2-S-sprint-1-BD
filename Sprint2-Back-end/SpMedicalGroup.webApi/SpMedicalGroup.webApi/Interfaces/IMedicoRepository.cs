using SpMedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Interfaces
{
    /// <summary>
    ///  Interface responsável por Medico
    /// </summary>
    interface IMedicoRepository
    {
        /// <summary>
        /// Lista todas as consultas pertecentes a um médico
        /// </summary>
        /// <param name="idMedico">id do medico que será usado para validação</param>
        /// <returns>Uma lista de agendamentos</returns>
        List<Agendamento> ListarMedicoAgendamentos(int idMedico);
        /// <summary>
        /// Adiciona uma descricao no agendamento
        /// </summary>
        /// <param name="idConsultas"> id do agendamento que será colocado a descrição </param>
        void AdicionarDescricao(int idAgendamento, Agendamento agendamentoDescricao);
    }
}
