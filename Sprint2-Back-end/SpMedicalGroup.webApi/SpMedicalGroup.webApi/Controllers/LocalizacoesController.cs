using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using SpMedicalGroup.webApi.Repositotories;
using System;

namespace SpMedicalGroup.webApi.Controllers
{
    [Produces("application/json")]  
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        private ILocalizacaoRepository _localizacaoRepository { get; set; }

        public LocalizacoesController()
        {
            _localizacaoRepository = new LocalizacaoRepository();
        }


        [HttpGet("listar")]
        public IActionResult ListarLocalizacoes()
        {
            try
            {
                return Ok(_localizacaoRepository.ListarLocalizacao());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
        
        [HttpPost("cadastrar")]
        public IActionResult CadastrarLocalizcao(Localizacao novaLocalizacao)
        {
            try
            {
                if (novaLocalizacao != null)
                {
                    _localizacaoRepository.CadastrarLocalizacao(novaLocalizacao);
                    return StatusCode(201);
                }

                return BadRequest(
                    new 
                    { 
                        menssage = "Coloque latitude e longitude na localização !",
                        erro = true
                    }
                    );
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }
    }
}
