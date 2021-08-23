USE Sp_medical_group;
GO

--tipoUsuario

INSERT INTO tipoUsuario (tituloUsuario)
VALUES ('Paciente'),
       ('M�dico'),
	   ('Administrador');
GO

--Clinica

INSERT INTO clinica (nomeFantasia, razaoSocial, cnpj, horarioFuncionamento)
VALUES ('Sp Med Group','SP Medical Group','86.400.902/0001-30', '24.09.9');
GO

-- Situacao

INSERT INTO situacao (estadoSituacao)
VALUES ('Realizada'),
       ('Cancelada'),
	   ('Agendada');
GO

--Especialidade

INSERT INTO especialidade (tituloEspecialidade)
VALUES ('Acupuntura'),
       ('Anestesiologia'),
	   ('Angiologia'),
	   ('Cardiologia'),
	   ('Cirugia Cardiovascular'),
	   ('Cirurgia da M�o'),
	   ('Cirurgia do Aparelho Digestivo'),
	   ('Cirurgia Geral'),
	   ('Cirurgia Pedi�trica'),
	   ('Cirurgia Pl�stica'),
	   ('Cirurgia Tor�cica'),
	   ('Cirurgia Vascular'),
	   ('Dermatologia'),
	   ('Radioterapia'),
	   ('Urologia'),
	   ('Pediatria'),
	   ('Psiquiatria')
	   GO

--usuario

INSERT INTO usuario (idTipoUsuario,nome,email,senha)
VALUES (2,'Ricardo Lemos','ricardo.lemos@spmedicalgroup.com.br','12345678'),
       (2,'Roberto Porssarle','roberto.possarle@spmedicalgroup.com.br','12345678'),
	   (2,'Helena Strada','helena.souza@spmedicalgroup.com.br','12345678'),
	   (1,'Ligia','ligia@gmail.com','12345678'),
	   (1,'Alexandre','alexandre@gmail.com','12345678'),
	   (1,'Fernando','fernando@gmail.com','12345678'),
	   (1,'Henrique','henrique@gmail.com','12345678'),
	   (1,'Jo�o','joao@hotmail.com','12345678'),
	   (1,'Bruno','bruno@gmail.com','12345678'),
	   (1,'Mariana','mariana@outlook.com','12345678');
GO

-- prontuario

INSERT INTO prontuario(idUsuario, dataNascimento, rg, cpf, enderecoProntuario)
VALUES (4,'13/10/1983','43522543-5','94839859000','Rua Estado de Israel 240, S�o Paulo, Estado de S�o Paulo, 04022-000'),
       (5,'23/07/2001','32654345-7','73556944057','Av. Paulista, 1578 - Bela Vista, S�o Paulo - SP, 01310-200'),
	   (6,'10/10/1978','54636525-3','16839338002','Av. Ibirapuera - Indian�polis, 2927,  S�o Paulo - SP, 04029-200'),
	   (7,'13/10/1985','54366362-5','14332654765','R. Vit�ria, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
	   (8,'27/08/1975','53254444-1','91305348010','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeir�o Pires - SP, 09405-380'),
	   (9,'21/03/1972','54566266-7','79799299004','Alameda dos Arapan�s, 945 - Indian�polis, S�o Paulo - SP, 04524-001'),
	   (10,'03/05/2018','54566266-8','13771913039','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
	   GO


--medico

INSERT INTO medico (idEspecialidade, idUsuario,idClinica, crm, nomeMedico)
VALUES (2,1,1,'54356SP','Ricardo Lemos'),
       (17,2,1,'53452SP', 'Roberto Possarle'),
	   (16,3,1,'65463SP', 'Helena Strada');
GO

DELETE medico;
--agendamento

INSERT INTO agendamento (idMedico,idProntuario,idSituacao, descricao,dataConsulta)
VALUES (3,7,1,'Febre','20/01/2020 15:00'),
       (2,2,2,'Gripe','01/06/2020 10:00'),
	   (2,3,1,'Dor na coluna','02/07/2020 11:00'),
	   (2,2,1,'Bem','02/006/2018 10:00'),
	   (1,4,2,'Dor de garganta','02/07/2019 11:00'),
	   (3,7,3,'Bem','03/08/2020 15:00'),
	   (1,4,3,'Bem','03/09/2020 11:00');
GO

