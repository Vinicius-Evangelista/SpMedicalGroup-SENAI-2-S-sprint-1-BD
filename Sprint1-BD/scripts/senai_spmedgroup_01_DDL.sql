CREATE DATABASE Sp_medical_group;
GO

USE Sp_medical_group;
GO

--Especialidade


CREATE TABLE especialidade(
idEspecialidade SMALLINT PRIMARY KEY IDENTITY (1,1),
tituloEspecialidade VARCHAR(100) UNIQUE NOT NULL
);
GO
--TRUNCATE TABLE especialidade;

--Clinica


CREATE TABLE clinica (
idClinica SMALLINT PRIMARY KEY IDENTITY (1,1),
nomeFantasia VARCHAR(50) UNIQUE NOT NULL,
razaoSocial VARCHAR(100) UNIQUE NOT NULL,
cnpj CHAR(18) UNIQUE NOT NULL,
horarioFuncionamento TIME NOT NULL
);
GO
--TRUNCATE TABLE clinica;

--Tipo Usuario


CREATE TABLE tipoUsuario (
idTipoUsuario SMALLINT PRIMARY KEY IDENTITY (1,1),
tituloUsuario VARCHAR(50) NOT NULL
);
GO
--TRUNCATE TABLE tipoUsuario;

--Situacao


CREATE TABLE situacao(
idSituacao TINYINT PRIMARY KEY IDENTITY (1,1),
estadoSituacao VARCHAR(50) NOT NULL
);
GO
--TRUNCATE TABLE situacao;

--Usuario

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY (1,1),
idTipoUsuario SMALLINT FOREIGN KEY REFERENCES tipoUsuario (idTipoUsuario) NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
senha VARCHAR(15) NOT NULL CHECK (len(senha)>=8) 
);
GO
--TRUNCATE TABLE usuario;


--Medico

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


CREATE TABLE prontuario
(idProntuario INT PRIMARY KEY IDENTITY (1,1),
idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario) NOT NULL,
dataNascimento DATE NOT NULL,
rg CHAR(12) NOT NULL UNIQUE,
cpf CHAR(14) NOT NULL UNIQUE,
enderecoProntuario VARCHAR(150),
);
GO
--TRUNCATE TABLE prontuario;

--Agendamento


--ImagemUsuario
CREATE TABLE imagemUsuario
(
	idImagem INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL UNIQUE FOREIGN KEY REFERENCES usuario(idUsuario),
	binario VARBINARY (MAX) NOT NULL,
	mimeType VARCHAR (30) NOT NULL,
	nomeArquivo VARCHAR(250) NOT NULL,
	data_inclusao DATETIME DEFAULT GETDATE() NULL
);
GO



CREATE TABLE agendamento (
idAgendamento INT PRIMARY KEY IDENTITY (1,1),
idMedico INT FOREIGN KEY REFERENCES medico (idMedico) NOT NULL,
idProntuario INT FOREIGN KEY REFERENCES prontuario (idProntuario) NOT NULL,
idSituacao TINYINT FOREIGN KEY REFERENCES situacao (idSituacao) NOT NULL,
descricao VARCHAR(500),
dataConsulta DATETIME
);
GO
--TRUNCATE TABLE agendamento;

DROP TABLE agendamento;
GO
DROP TABLE imagemUsuario;
GO
DROP TABLE prontuario;
GO
DROP TABLE medico;
GO
DROP TABLE usuario;
GO
DROP TABLE situacao;
GO
DROP TABLE tipoUsuario;
GO
DROP TABLE clinica;
GO
DROP TABLE especialidade;
GO