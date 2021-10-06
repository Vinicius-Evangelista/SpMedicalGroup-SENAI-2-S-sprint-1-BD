using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.webApi.Domains
{
    public partial class Agendamento
    {
        public int IdAgendamento { get; set; }
        public int IdMedico { get; set; }
        public int IdProntuario { get; set; }
        public byte IdSituacao { get; set; }
        public string Descricao { get; set; }
        public DateTime? DataConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Prontuario IdProntuarioNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
