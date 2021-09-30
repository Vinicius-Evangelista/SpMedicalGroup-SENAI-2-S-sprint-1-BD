using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SpMedicalGroup.webApi.Contexts;
using SpMedicalGroup.webApi.Domains;
using SpMedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.Repositotories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedicalGroupContext context = new();

        public void Agendar(Agendamento novoAgendamento)
        {
            //atribuindo um valor fixo caso o 
            novoAgendamento.IdSituacao = 3;

            //adicionando na tabela
            context.Agendamentos.Add(novoAgendamento);

            //salvando as alterações
            context.SaveChanges();
        }

        public void CadastrarClinica(Clinica novaClinica)
        {
            //adicionando na lista de clínica
            context.Clinicas.Add(novaClinica);

            //salvando alterações
            context.SaveChanges();
        }

        public void CadastrarUsuario(Usuario novoUsuario)
        {

            //adiciona um usuário
            context.Usuarios.Add(novoUsuario);

            //salvar as alterações
            context.SaveChanges();
        }

        public void CancelarAgendamento(int idConsulta)
        {
            //criando instãncia e atribuindo caso a o id do agendamento for achado.
            Agendamento agendamentoAchado = context.Agendamentos.FirstOrDefault(a => a.IdAgendamento == idConsulta);

            //caso a verificação seja true ele atribui e salve
            if (agendamentoAchado != null)
            {
                //atribuindo o
                agendamentoAchado.IdSituacao = 2;

                context.Agendamentos.Update(agendamentoAchado);

                context.SaveChanges();
            }
        }

        public List<Agendamento> ListarAgendamentos()
        {
            //criando e retornando a lista.
            return context.Agendamentos
               .Select(a => new Agendamento
               {
                   IdAgendamento = a.IdAgendamento,
                   IdMedico = a.IdMedico,
                   IdProntuario = a.IdProntuario,
                   IdSituacao = a.IdSituacao,
                   DataConsulta = a.DataConsulta,
                   Descricao = a.Descricao,

                   IdMedicoNavigation = new Medico()
                   {
                       NomeMedico = a.IdMedicoNavigation.NomeMedico
                   },

                   IdProntuarioNavigation = new Prontuario()
                   {
                       IdUsuarioNavigation = new Usuario()
                       {
                           Nome = a.IdProntuarioNavigation.IdUsuarioNavigation.Nome
                       }
                   },

                   IdSituacaoNavigation = new Situacao()
                   {
                       EstadoSituacao = a.IdSituacaoNavigation.EstadoSituacao
                   }
               })
               .ToList();
        }

        public List<Prontuario> ListarProntuarios()
        {
            //criando e retornando a lista junto com dados de outra tabela
            return context.Prontuarios
                 .Select(
                e => new Prontuario
                {

                    IdProntuario = e.IdProntuario,
                    IdUsuario = e.IdUsuario,
                    IdUsuarioNavigation = e.IdUsuarioNavigation,
                    DataNascimento = e.DataNascimento,
                    EnderecoProntuario = e.EnderecoProntuario
                }
                )
                 .ToList();
        }

        public List<Medico> ListarMedicos()
        {
            //criando e retornando a lista usando include para incluir dados de outra tabela
            return context.Medicos
                .Select( m => new Medico()
                {

                   IdMedico = m.IdMedico,
                   IdUsuario = m.IdUsuario,
                   IdClinica = m.IdClinica,
                   Crm = m.Crm,
                   NomeMedico = m.NomeMedico
                }
                )
                .ToList();
        }

        public string ConsultaPerfil(int id_usuario)
        {
            ImagemUsuario imagemUsuario = new ImagemUsuario();
            imagemUsuario = context.ImagemUsuarios.FirstOrDefault(im => im.IdUsuario == id_usuario);

            //verificando se exite uma de perfil para o usuario
            if (imagemUsuario != null)
            {
                //convert o valor de uma matriz de inteiros (byte) em string
                return Convert.ToBase64String(imagemUsuario.Binario);
            }

            return null;
        }

        public void SalvarPerfilBD(IFormFile foto, int id_usuario)
        {
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            using (var ms = new MemoryStream())
            {
                //copia a imagem enviada para memoria
                foto.CopyTo(ms);

                //ToArray = byte de um elementro matriz.
                imagemUsuario.Binario = ms.ToArray();

                //nome do arquivo
                imagemUsuario.NomeArquivo = foto.FileName;

                //extensao do arquivo
                imagemUsuario.MimeType = foto.FileName.Split('.').Last();

                //id_usuario
                imagemUsuario.IdUsuario = id_usuario;

            }


            //analisar se o usuario ja possui foto de perfil.
            ImagemUsuario imageExistente = new();
            imageExistente = context.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == id_usuario);

            if (imageExistente != null)
            {
                //atualizar imagem de perfil atual pelo novo objeto enviado.
                imageExistente.Binario = imagemUsuario.Binario;
                imageExistente.NomeArquivo = imagemUsuario.NomeArquivo;
                imageExistente.MimeType = imageExistente.MimeType;
                imageExistente.IdUsuario = id_usuario;


                context.ImagemUsuarios.Update(imageExistente);

                context.SaveChanges();
            }
            else
            {
                context.ImagemUsuarios.Add(imagemUsuario);

                context.SaveChanges();
            }
        }


        public Usuario Login(string senha, string email)
        {
            //retornando o usuario que possui esse email e essa senha.
            return context.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }      
    }
}
