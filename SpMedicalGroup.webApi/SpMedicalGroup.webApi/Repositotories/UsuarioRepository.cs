using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Repositotories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public void Agendar(Agendamento novoAgendamento)
        {
            throw new NotImplementedException();
        }

        public void CadastrarClinica(Clinica novaClinica)
        {
            throw new NotImplementedException();
        }

        public void CadastrarUsuario(Usuario novoUsuario)
        {
            throw new NotImplementedException();
        }

        public void CancelarAgendamento(int idConsulta)
        {
            throw new NotImplementedException();
        }

        public List<Agendamento> ListarAgendamentos()
        {
            throw new NotImplementedException();
        }

        public Usuario Login(string senha, string email)
        {
            throw new NotImplementedException();
        }
    }
}
