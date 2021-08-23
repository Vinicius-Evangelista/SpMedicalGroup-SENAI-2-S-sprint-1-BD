CREATE DATABASE Sp_medical_group;
GO

USE Sp_medical_group;
GO

--Especialidade

--TRUNCATE TABLE especialidade;
--DROP TABLE especialidade;

CREATE TABLE especialidade(
idEspecialidade SMALLINT PRIMARY KEY IDENTITY (1,1),
tituloEspecialidade VARCHAR(100) UNIQUE NOT NULL
);
GO

--Clinica

--DROP TABLE clinica;
--TRUNCATE TABLE clinica;

CREATE TABLE clinica (
idClinica SMALLINT PRIMARY KEY IDENTITY (1,1),
nomeFantasia VARCHAR(50) UNIQUE NOT NULL,
razaoSocial VARCHAR(100) UNIQUE NOT NULL,
cnpj CHAR(18) UNIQUE NOT NULL,
horarioFuncionamento TIME NOT NULL
);
GO

--Tipo Usuario

--DROP TABLE tipoUsuario;
--TRUNCATE TABLE tipoUsuario;

CREATE TABLE tipoUsuario (
idTipoUsuario SMALLINT PRIMARY KEY IDENTITY (1,1),
tituloUsuario VARCHAR(50) NOT NULL
);
GO

--Situacao

--DROP TABLE situacao;
--TRUNCATE TABLE situacao;

CREATE TABLE situacao(
idSituacao TINYINT PRIMARY KEY IDENTITY (1,1),
estadoSituacao VARCHAR(50) NOT NULL
);
GO

--Usuario
--DROP TABLE usuario;
--TRUNCATE TABLE usuario;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY (1,1),
idTipoUsuario SMALLINT FOREIGN KEY REFERENCES tipoUsuario (idTipoUsuario) NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
senha CHAR(15) NOT NULL CHECK (len(senha)>=8) 
);
GO

--Medico

--DROP TABLE medico;
--TRUNCATE TABLE medico;

CREATE TABLE medico(
idMedico INT PRIMARY KEY IDENTITY (1,1),
idEspecialidade SMALLINT FOREIGN KEY REFERENCES especialidade(idEspecialidade) NOT NULL,
idClinica SMALLINT FOREIGN KEY REFERENCES clinica (idClinica) NOT NULL,
idUsuario INT FOREIGN KEY REFERENCES usuario (idUsuario) NOT NULL,
crm VARCHAR(7) NOT NULL UNIQUE,
nomeMedico VARCHAR(100) NOT NULL
);
GO

--ALTER TABLE medico
--ADD nomeMedico VARCHAR(100) NOT NULL;

--prontuario

--TRUNCATE TABLE prontuario;
--DROP TABLE prontuario;

CREATE TABLE prontuario
(idProntuario INT PRIMARY KEY IDENTITY (1,1),
idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario) NOT NULL,
dataNascimento DATE NOT NULL,
rg CHAR(12) NOT NULL UNIQUE,
cpf CHAR(14) NOT NULL UNIQUE,
enderecoProntuario VARCHAR(150),
);
GO

--Agendamento

--DROP TABLE agendamento;
--TRUNCATE TABLE agendamento;

CREATE TABLE agendamento (
idAgendamento INT PRIMARY KEY IDENTITY (1,1),
idMedico INT FOREIGN KEY REFERENCES medico (idMedico) NOT NULL,
idProntuario INT FOREIGN KEY REFERENCES prontuario (idProntuario) NOT NULL,
idSituacao TINYINT FOREIGN KEY REFERENCES situacao (idSituacao) DEFAULT (3) NOT NULL,
descricao VARCHAR(500),
dataConsulta DATETIME
);
GO

