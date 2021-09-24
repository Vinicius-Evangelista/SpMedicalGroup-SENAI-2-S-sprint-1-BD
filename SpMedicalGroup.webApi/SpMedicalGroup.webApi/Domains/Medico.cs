using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.webApi.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Agendamentos = new HashSet<Agendamento>();
        }

        public int IdMedico { get; set; }
        public short IdEspecialidade { get; set; }
        public short IdClinica { get; set; }
        public int IdUsuario { get; set; }
        public string Crm { get; set; }
        public string NomeMedico { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Agendamento> Agendamentos { get; set; }
    }
}
