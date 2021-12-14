using MongoDB.Driver;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using System.Collections.Generic;

namespace SpMedicalGroup.webApi.Repositotories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {

        private readonly IMongoCollection<Localizacao> _localizacoes;

        public LocalizacaoRepository()
        {
            var cliente = new MongoClient("mongodb://localhost:27017")

                .GetDatabase("spmedicalgroup_tarde_localizacao")
                .GetCollection<Localizacao>("localizacao");
                _localizacoes = cliente;
        }

        public void CadastrarLocalizacao(Localizacao novaLocalizacao)
        {
            _localizacoes.InsertOne(novaLocalizacao);
        }

        public List<Localizacao> ListarLocalizacao()
        {
            return _localizacoes.Find(localizacao => true).ToList();
        }
    }
}
