#Permite visualizar todos os databases existentes no BD
show databases;

#Permite apagar um database e toda a sua estrutura de tabelas e dados
drop database dbcontatos20222;

#Permite criar um novo database no BD
create database db_lion_school;

#Permite ativar a utilizacao do database
use db_lion_school;

#Permite visualizar todas as tabelas existentes dentro de um database
show tables;

create table  tbl_aluno (
id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(100) not null,
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(20),
    celular varchar(18),
    data_nascimento date not null,
unique index(id)
   
);

create table tbl_curso (
id int UNSIGNED not null auto_increment primary key,
nome varchar(80) not null,
    carga_horaria int not null,
    icone varchar(100) not null,
    sigla varchar(5),
unique index(id)

);
 
create table tbl_aluno_curso (
id int UNSIGNED not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
matricula varchar(15) not null,
    status_aluno varchar(10) not null,
   
    #programacao para definir uma chave estrangeira
    foreign key (id_aluno) #define qual atributo sera uma FK
references tbl_aluno (id), #define de onde virá a pk
foreign key (id_curso) #define qual atributo sera uma FK
references tbl_curso(id), #define de onde virá a pk
    unique index(id)
   
);

#Permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

insert into tbl_aluno (nome, foto, rg, cpf, sexo, email, telefone, celular, data_nascimento)
values ('José da Silva', 'https://pm1.narvii.com/6551/40f645a70e254a24b73db4d74f214729c445f7c4_128.jpg', '34.563.666-1', '300.567.384-15', 'M', 'jose@gmail.com', '011 4002-8922', '011  11 1234-56789', '2000-04-10' );

insert into tbl_aluno (nome, foto, rg, cpf, sexo, email, telefone, celular, data_nascimento)
values ('Maria da Silva', 'https://www.mundoecologia.com.br/wp-content/uploads/2019/04/Curiosidades-Sobre-a-Lula-2.jpg', '34.234.777-1', '340.234.384-29', 'F', 'maria@gmail.com', '011 4003-8933', '011  11 1232-56923', '2006-09-10' );


update tbl_aluno set rg = '35.567.23-4' where id = 1;

#Permite apagar um registro de uma tabela no banco de dados
#sempre especificar o registro que devera ser deletado
delete from tbl_aluno where id = 1;

select cast (id as float) as id, nome from tbl_aluno