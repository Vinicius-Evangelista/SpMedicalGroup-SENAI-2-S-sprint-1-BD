using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webApi.Interfaces;
using SpMedicalGroup.webApi.Repositotories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace SpMedicalGroup.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProntuariosController : ControllerBase
    {
        //criando variável que vai receber os métodos da repository
        private IProntuarioRepository _prontuarioRepository { get; set; }


        public ProntuariosController()
        {
            //aplicando os métodos da repository 
            _prontuarioRepository = new ProntuarioRepository();
        }


        [Authorize(Roles = "1")]
        [HttpGet("listar")]
        public IActionResult ListarConsultasPaciente ()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                //retorna lista do paciente que contem o id passado pela url
                return Ok(_prontuarioRepository.ListarPacienteAgendamentos(idUsuario));
                
            }
            catch (Exception excep)
            {
                //caso não dê certo
                return BadRequest(
                    new
                    {
                        mensagem = "id do paciente é obrigatório !",
                        erro = excep

                    }
                    );
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("listar/{idAgendamento}")]
        public IActionResult BuscarConsultaPaciente(int idAgendamento)
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                //retorna lista do paciente que contem o id passado pela url
                return Ok(_prontuarioRepository.PacienteAgendamento(idAgendamento ,idUsuario));

            }
            catch (Exception excep)
            {
                //caso não dê certo
                return BadRequest(
                    new
                    {
                        mensagem = "id do paciente é obrigatório !",
                        erro = excep

                    }
                    );
            }
        }

    }
}
