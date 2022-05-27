create database milton;
use milton;

create table usuario(
idusuario int primary key auto_increment,
nome_usuario varchar(45),
email_usuario varchar(45),
senha_usuario varchar(45)
);

create table coment(
idcoment int primary key auto_increment,
fkusuario int,
foreign key (fkusuario) references usuario(idusuario),
comentario varchar(300)
);

create table questionario(
idquestionario int primary key auto_increment,
fkusuario int,
foreign key (fkusuario) references usuario(idusuario),
questao1 varchar(45),
questao2 varchar(45),
questao3 varchar(45),
questao4 varchar(45),
questao5 varchar(45)
);

/* para sql server - remoto - produção */
CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* altere esta tabela de acordo com o que está em INSERT de sua API do arduino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);
