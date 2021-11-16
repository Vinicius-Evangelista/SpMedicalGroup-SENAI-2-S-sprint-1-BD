using SpMedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Interfaces
{
    /// <summary>
    /// interface responsável por Prontuario
    /// </summary>
    interface IProntuarioRepository
    {
        /// <summary>
        /// Lista as consultas do paciente
        /// </summary>
        /// <param name="idPaciente">id do paciente usado validação</param>
        /// <returns>uma lista de paciente</returns>
        List<Agendamento> ListarPacienteAgendamentos(int idPaciente);
        List <Agendamento> PacienteAgendamento(int idAgendamento, int idProntuario);


    }
}
