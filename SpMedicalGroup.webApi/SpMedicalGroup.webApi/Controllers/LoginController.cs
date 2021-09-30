using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using SpMedicalGroup.webApi.Repositotories;
using SpMedicalGroup.webApi.ViewModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SpMedicalGroup.webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // instânica do tipo usuárioRepository que contém os métodos
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            //atribuindo os métodos
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost("login")]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                //buscando um usuário
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Senha, login.Email);

                if (usuarioBuscado != null)
                {
                    
                    

                    //declarando as claims
                    var minhasClaims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                        new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString())

                    };

                    //key word para descriptografar a informação
                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("UQIEUW-ORPOEWI-23854-023AKJD"));

                    //encriptografando os dados
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    //declarando atributos do token
                    var MeuToken = new JwtSecurityToken(
                        
                        //emissor
                        issuer: "SpMedicalGroup.webApi",
                        
                        //destinatário
                        audience: "SpMedicalGroup.webApi",
                        
                        //claims/informações
                        claims: minhasClaims,
                        
                        //data de expiração
                        expires: DateTime.Now.AddHours(1),
                        signingCredentials: creds
                        );

                    //escrevendo o token e devolvedo
                    return Ok(new
                    {
                        //escrever o token
                        token = new JwtSecurityTokenHandler().WriteToken(MeuToken)
                    }
                        );
                }

                return NotFound(
                    new
                    {

                        mensagem = "Email/senha passados estão incorretos ou o usuário não existe !",
                        erro = true
                    }

                    );
            }
            catch (Exception excep)
            {
                return BadRequest(
                    new
                    {
                        mensagem = "Algo deu errado no servidor !",
                        erro = excep
                    }
                    );
            }
        }

    }
}
