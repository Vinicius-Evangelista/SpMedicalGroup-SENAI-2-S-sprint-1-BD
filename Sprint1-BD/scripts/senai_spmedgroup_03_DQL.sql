USE Sp_medical_group_tarde;
GO

--feito duas coisas exigidas do DQL

SELECT * FROM clinica;
SELECT * FROM tipoUsuario;
SELECT * FROM usuario;
SELECT * FROM especialidade;
SELECT * FROM medico;
SELECT * FROM prontuario;
SELECT * FROM situacao;
SELECT * FROM agendamento;
SELECT * FROM imagemUsuario;


SELECT nome, nomeMedico, dataConsulta, idSituacao
FROM agendamento
JOIN prontuario
ON agendamento.idProntuario = prontuario.idProntuario
JOIN usuario
ON prontuario.idUsuario = usuario.idUsuario
JOIN medico
ON agendamento.idMedico = medico.idMedico;

-----
 
 --Exigências do sprint

SELECT COUNT(idUsuario) [Numero de usuarios] FROM usuario; 

SELECT idUsuario ,CONVERT(VARCHAR(10),dataNascimento, 103) [Data de nascimento], rg, cpf, enderecoProntuario 
FROM prontuario;
GO

--função

CREATE FUNCTION EspecialidadeMedico (@especialidade VARCHAR(70))
RETURNS TABLE
AS 
RETURN
(
	SELECT COUNT(tituloEspecialidade) AS [Especialidades total]
	FROM especialidade
	JOIN medico
	ON especialidade.idEspecialidade = medico.idEspecialidade
	WHERE medico.idEspecialidade = 2


);
GO

CREATE PROCEDURE IdadePaciente (@usuario VARCHAR(100))
AS
BEGIN
SELECT U.nome, DATEDIFF(YEAR,dataNascimento, GETDATE())
AS idade
FROM prontuario P
JOIN usuario U
ON U.idUsuario = P.idUsuario
WHERE U.nome = @usuario
END
GO

EXEC IdadePaciente 'Henrique';