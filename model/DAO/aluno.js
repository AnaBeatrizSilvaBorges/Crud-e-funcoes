/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD ( insert, update, delete, select )
 * Autor: Ana Beatriz Silva
 * Data Criação: 06/10/2022
 * Versão: 1.0 
 *********************************************************************************************************/

const { isBooleanObject } = require('util/types');
const { MESSAGE_ERROR } = require('../../modulo/config');


// Função para inserir um novo regristro no Banco de dados. 
const insertAluno = async function (aluno) {

    try {
         // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');

    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 

    let sql = `insert into tbl_aluno (nome, foto, rg, cpf, sexo, email, telefone, celular, data_nascimento) values('${aluno.nome}', 
    '${aluno.foto}','${aluno.rg}','${aluno.cpf}','${aluno.sexo}', '${aluno.email}','${aluno.telefone}','${aluno.celular}', '${aluno.data_nascimento}')`;
        
    // Executa o script sql no Banco de Dados
    // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
    const result = await prisma.$executeRawUnsafe(sql);


    // Verifica se o scrpit foi executado com sucesso no Banco de Dados
    if (result) 
    {
        return true;
    }
     
    else 
    {
        return false;
    }

    }

    catch (error) 
    {
        return false;
    }
    

   
}

// Função para atualizar um novo regristro no Banco de dados. 
const updateAluno = async function (aluno) {
    
    try {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
   const { PrismaClient } = require('@prisma/client');

   // Instancia da classe PrismaClient
   const prisma = new PrismaClient(); 

   let sql = `update tbl_aluno set 
    nome            = '${aluno.nome}', 
    foto            = '${aluno.foto}',
    rg              = '${aluno.rg}',
    cpf             = '${aluno.cpf}',
    sexo            = '${aluno.sexo}',
    email           =  '${aluno.email}',
    telefone        = '${aluno.telefone}',
    celular         = '${aluno.celular}',
    data_nascimento ='${aluno.data_nascimento}'

    where id = '${aluno.id}'
    `;

     console.log(sql)
       
   // Executa o script sql no Banco de Dados
   // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
   const result = await prisma.$executeRawUnsafe(sql);


   // Verifica se o scrpit foi executado com sucesso no Banco de Dados
   if (result) 
   {
       return true;
   }
    
   else 
   {
       return false;
   }

   }

   catch (error) 
   {
       return false;
   }
}

// Função para deletar um regristro no Banco de dados. 
const deleteAluno = async function (id) {
    try {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
   const { PrismaClient } = require('@prisma/client');

   // Instancia da classe PrismaClient
   const prisma = new PrismaClient(); 

   let sql = `delete from tbl_aluno where id = '${id}'`;

//    console.log(sql)

    // Executa o script sql no Banco de Dados
   // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
   const result = await prisma.$executeRawUnsafe(sql);


   // Verifica se o scrpit foi executado com sucesso no Banco de Dados
   if (result) 
   {
       return true;
   }
    
   else 
   {
       return MESSAGE_ERROR.INTERNAL_ERROR_DB;
   }

   }

   catch (error) 
   {
       return false;
   }
}


// Função para retornar todos os regristros do Banco de dados. 
const selectAllAlunos = async function () {
        
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');

    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 

    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, email, celular, telefone, rg, cpf, data_nascimento from tbl_aluno order by id desc`;

    

    if (rsAlunos.length > 0)  
    {
        return rsAlunos
    }

    else {
        return false; 
    }
   


}

// Função para retornar apenas um registro baseado no Id
const selectAlunoById = async function (id) {
     
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');

    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
 
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.

    let sql = `select cast(id as float) as id, nome, 
    foto, sexo, email, celular, telefone, rg, cpf, data_nascimento from tbl_aluno where id = ${id}`
    
    const rsAluno = await prisma.$queryRawUnsafe(sql);
 
    if (rsAluno.length > 0)  
    {
        return rsAluno
    }
 
    else {
        return false; 
    }
    
}

// Função para retornar o último Id gerado no Banco de Dados
const selectLastId = async function () {

    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');

    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 

    //Script para buscar o ultimo id do Banco de Dados
    let sql = `SELECT CAST(id AS float) AS id FROM tbl_aluno ORDER BY id DESC LIMIT 1;` 

    const rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno)
    {
        return rsAluno[0].id;
    }

    else {
        return false;
    }

}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAlunoById,
    selectLastId
}