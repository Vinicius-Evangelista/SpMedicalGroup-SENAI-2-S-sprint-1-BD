using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using SpMedicalGroup.webApi.Repositotories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Controllers
{
    //definição do tipo de resposta da api
    [Produces("application/json")]

    //definição da rota
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        //objeto que recebe os métodos da interface.
        private IMedicoRepository _medicoRepository { get; set; }

        public MedicosController()
        {
            //atribuindo os métodos que estão na repository.
            _medicoRepository = new MedicoRepository();
        }

        //TESTADO
        [Authorize(Roles = "2")]
        [HttpPatch("{idAgendamento}")]
        public IActionResult AdicionarDescricao(int idAgendamento, Agendamento agendamentoDescrição)
        {
            try
            {
                //invocando o método para a execução da requisão.
                _medicoRepository.AdicionarDescricao(idAgendamento, agendamentoDescrição);
                return StatusCode(201) ;
            }
            catch (Exception excep)
            {

                return BadRequest(excep);
            }
        }

        //TESTADO
        [Authorize(Roles = "2")]
        [HttpGet("listar")]
        public IActionResult ListarMedicoConsultas()
        {

            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_medicoRepository.ListarMedicoAgendamentos(idUsuario));
            }
            catch (Exception excep)
            {

                return BadRequest(excep);
            }
        }


        [Authorize(Roles = "2")]
        [HttpGet("listar/{idAgendamento}")]
        public IActionResult ListarMedicoConsultas(int idAgendamento)
        {

            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_medicoRepository.MedicoAgendamento(idAgendamento, idUsuario));
            }
            catch (Exception excep)
            {

                return BadRequest(excep);
            }
        }
    }
}
