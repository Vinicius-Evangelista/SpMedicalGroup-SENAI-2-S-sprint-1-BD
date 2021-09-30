using Microsoft.EntityFrameworkCore;
using SpMedicalGroup.webApi.Contexts;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Repositotories
{
    public class ProntuarioRepository : IProntuarioRepository
    {
        SpMedicalGroupContext context = new SpMedicalGroupContext();


        //mudar, pegar id pelo token
        public List<Agendamento> ListarPacienteAgendamentos(int idUsuario)
        {
            Prontuario prontuario = context.Prontuarios.FirstOrDefault(p => p.IdUsuario == idUsuario);

            return context.Agendamentos
             .Select(a => new Agendamento
             {
                 IdAgendamento = a.IdAgendamento,
                 IdMedico = a.IdMedico,
                 IdProntuario = a.IdProntuario,
                 IdSituacao = a.IdSituacao,
                 DataConsulta = a.DataConsulta,
                 Descricao = a.Descricao,

                 IdMedicoNavigation = new Medico()
                 {
                     NomeMedico = a.IdMedicoNavigation.NomeMedico
                 },

                IdProntuarioNavigation = new Prontuario()
                {
                    IdUsuarioNavigation = new Usuario ()
                    {
                        Nome = a.IdProntuarioNavigation.IdUsuarioNavigation.Nome
                    }
                },

                IdSituacaoNavigation = new Situacao()
                {
                    EstadoSituacao = a.IdSituacaoNavigation.EstadoSituacao
                }
             }
                )
            .Where(a => a.IdProntuario == prontuario.IdProntuario)
            .ToList();



        }
    }
}
