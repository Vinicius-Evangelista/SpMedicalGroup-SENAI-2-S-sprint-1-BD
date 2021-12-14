using SpMedicalGroup.webApi.Domains;
using System.Collections.Generic;

namespace SpMedicalGroup.webApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        /// <summary>
        /// Cadastra uma nova localizacao.
        /// </summary>
        /// <param name="novaLocalizacao"> nova localizacao contendo latitude e longitude</param>
        void CadastrarLocalizacao(Localizacao novaLocalizacao);

        /// <summary>
        /// Lista todas as localizações.
        /// </summary>
        /// <returns>Retorna uma lista com todas as localizações</returns>
        public List<Localizacao> ListarLocalizacao();
    }
}
