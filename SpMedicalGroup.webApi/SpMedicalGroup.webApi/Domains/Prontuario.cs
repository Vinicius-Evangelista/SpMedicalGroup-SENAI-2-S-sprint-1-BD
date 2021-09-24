using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.webApi.Domains
{
    public partial class Prontuario
    {
        public Prontuario()
        {
            Agendamentos = new HashSet<Agendamento>();
        }

        public int IdProntuario { get; set; }
        public int IdUsuario { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string EnderecoProntuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Agendamento> Agendamentos { get; set; }
    }
}
