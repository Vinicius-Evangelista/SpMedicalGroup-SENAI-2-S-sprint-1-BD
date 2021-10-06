using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webApi.Domains;
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
    public class UsuariosController : ControllerBase
    {
        //variável que recebe os métodos da interface da usuário
        private IUsuarioRepository _usuarioRepository { get; set; }

        //construtor que atribui os métodos presentes na repository para a interface
        public UsuariosController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "3")]
        [HttpPost("admin")]
        public IActionResult Agendar(Agendamento novoAgendamento)
        {
            try
            {
                //validando parâmetro
                if (novoAgendamento != null)
                {
                    //caso true execute o método de agendar
                    _usuarioRepository.Agendar(novoAgendamento);
                    return StatusCode(201);
                }

                //caso false exiba não encontrado
                return NotFound(
                    new
                    {
                        mensagem = "Nenhum agendamento passado",
                        erro = true
                    }

                    );
            }
            catch (Exception excep)
            {
                //erro no métod o no servidor
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor !",
                        erro = excep
                    }

                    );
            }

        }

        [Authorize(Roles = "3")]
        [HttpPost]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            //tratamento de erros
            try
            {
                //validação do argumento passado
                if (novoUsuario == null)
                {
                    return NotFound("Corpo vazio");
                }

                //execução do método caso a validação acima for false
                _usuarioRepository.CadastrarUsuario(novoUsuario);
                return StatusCode(201);

            }
            catch (Exception excep)
            {
                //retorne esse status code caso algum erro aconteça
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor !",
                        erro = excep
                    }

                    );
            }
        }

        //aplicando restrição ao método, permitindo o acesso somente ao Administrador
        [Authorize(Roles = "3")]
        [HttpPost("clinica")]
        public IActionResult CadastrarClinica(Clinica novaClinica)
        {
            try
            {
                //validando o argumento passado
                if (novaClinica != null)
                {
                    //cadastre clinica caso seja diferente de nullo
                    _usuarioRepository.CadastrarClinica(novaClinica);
                    return StatusCode(201);
                }

                //caso argumento seja nullo mande um aviso
                return NotFound("O corpo não pode estar vazio !");
            }
            catch (Exception execp)
            {
                //caso dê erro no método ou em algum código retorne isso.
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor, ou algum método !",
                        erro = execp
                    }
                    );
            }
        }

        [Authorize(Roles = "3")]
        [HttpPatch("cancelar/consulta/{id}")]
        public IActionResult CancelarConsulta(int idAgendamento)
        {
            //tratamento dos erros
            try
            {
                //execute o método e retorne caso o processo seja bem sucedido
                _usuarioRepository.CancelarAgendamento(idAgendamento);
                return Ok("Consulta de cancelada !");
            }
            catch (Exception execp)
            {
                //retorne o erro tratado quando der erro no método
                return BadRequest(
                    new
                    {
                        mensagem = "Id passo vazio, ou erro no servidor",
                        erro = execp
                    }


                    );
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("listar/agendamentos")]
        public IActionResult ListarTodosAgendamento()
        {
            try
            {
                //retornar lista de todos os agendamentos
                return Ok(_usuarioRepository.ListarAgendamentos());
            }
            catch (Exception excep)
            {
                //caso de algum erro trate como um exception e retorne essa mensagem juntamente
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor ou em algum método",
                        erro = excep
                    }

                    );
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("listar/pacientes")]
        public IActionResult ListarTodosProntuarios()
        {
            try
            {
                //retornar lista de todos os prontuarios
                return Ok(_usuarioRepository.ListarProntuarios());
            }
            catch (Exception excep)
            {
                //caso de algum erro trate como um exception e retorne essa mensagem juntamente
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor ou em algum método",
                        erro = excep
                    }

                    );
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("listar/medicos")]
        public IActionResult ListarTodosMedicos()
        {
            try
            {
                //retornar lista de todos os medicos
                return Ok(_usuarioRepository.ListarMedicos());
            }
            catch (Exception excep)
            {
                //caso de algum erro trate como um exception e retorne essa mensagem juntamente
                return BadRequest(
                    new
                    {
                        mensagem = "Erro no servidor ou em algum método",
                        erro = excep
                    }

                    );
            }
        }


        [Authorize(Roles = "1, 2")]
        [HttpPost("imagem")]
        public IActionResult AdicionarImagem(IFormFile arquivo)
        {
            try
            {
                //analise de tamanho do arquivo
                if (arquivo.Length > 50000000)//5MB
                {
                    return BadRequest(new { mensagem = "O tamanho máximo da imaegm é de 5mb", erro = true });
                }

                //pegando a ultima parte do arquivo para saber se é jpeg ou png
                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png" && extensao != "jpeg")
                {
                    return BadRequest(new { mensagem = "Apenas arquivos png ou arquivos jpeg são aceitos." });
                }

                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _usuarioRepository.SalvarPerfilBD(arquivo, idUsuario);
                return StatusCode(201);
            }
            catch (Exception excep)
            {
                return BadRequest(excep);

            }

        }


        [HttpGet("imagem")]
        public IActionResult MostrarImagem()
        {
            try
            {
                //pegando o id do usuarioi pelo token
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                //string que recebe o código em binário
                string base64 = _usuarioRepository.ConsultaPerfil(idUsuario);

                //devolve para o usuario
                return Ok(base64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
