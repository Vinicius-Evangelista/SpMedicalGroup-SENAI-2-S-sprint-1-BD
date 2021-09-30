using SpMedicalGroup.webApi.Contexts;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Repositotories
{
    public class MedicoRepository : IMedicoRepository
    {
        SpMedicalGroupContext context = new SpMedicalGroupContext();

        public void AdicionarDescricao(int idAgendamento, Agendamento agendamentoDescricao)
        {
            //verificando se o objeto passado não é nullo
            Agendamento agendamentoAchado = context.Agendamentos.FirstOrDefault(a => a.IdAgendamento == idAgendamento);

            //verificação e em seguida atribuição caso o valor seja diferente de nullo
            if (agendamentoAchado != null)
            {
                //atualizando descrição
                agendamentoAchado.Descricao = agendamentoDescricao.Descricao;

                //atualizando
                context.Agendamentos.Update(agendamentoAchado);

                //salvando alterações
                context.SaveChanges();
            }

        }

        //colocar id pelo token
        public List<Agendamento> ListarMedicoAgendamentos(int idUsuario)
        {
            Medico medico = context.Medicos.FirstOrDefault(m => m.IdUsuario == idUsuario);

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
                      IdUsuarioNavigation = new Usuario()
                      {
                          Nome = a.IdProntuarioNavigation.IdUsuarioNavigation.Nome
                      }
                  },

                  IdSituacaoNavigation = new Situacao()
                  {
                      EstadoSituacao = a.IdSituacaoNavigation.EstadoSituacao
                  }
              })
              .Where(a => a.IdMedico == medico.IdMedico)
              .ToList();


        }
    }
}
