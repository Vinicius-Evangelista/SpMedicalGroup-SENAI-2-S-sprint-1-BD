using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.webApi.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Agendamentos = new HashSet<Agendamento>();
        }

        public byte IdSituacao { get; set; }
        public string EstadoSituacao { get; set; }

        public virtual ICollection<Agendamento> Agendamentos { get; set; }
    }
}
