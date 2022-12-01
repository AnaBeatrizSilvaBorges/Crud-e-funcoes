const { isBooleanObject } = require('util/types');
const { MESSAGE_ERROR } = require('../../modulo/config');
const { insertAluno } = require('./aluno');

const insertCurso = async function (curso) 
{
    try {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
   const { PrismaClient } = require('@prisma/client');

   // Instancia da classe PrismaClient
   const prisma = new PrismaClient(); 

   let sql = `insert into tbl_curso (nome, carga_horaria, icone, sigla) values('${curso.nome}', 
   '${curso.carga_horaria}','${curso.icone}','${curso.sigla}')`;
      
   
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

const updateCurso = async function (curso)
{
    try {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
   const { PrismaClient } = require('@prisma/client');

   // Instancia da classe PrismaClient
   const prisma = new PrismaClient(); 

   let sql = `update tbl_curso set 
    nome                     = '${curso.nome}', 
    carga_horaria            = '${curso.carga_horaria}',
    icone                    = '${curso.icone}',
    sigla                    = '${curso.sigla}'
    
    where id = '${curso.id}'
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

const deleteCurso = async function(id)
{
    try {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
   const { PrismaClient } = require('@prisma/client');

   // Instancia da classe PrismaClient
   const prisma = new PrismaClient(); 

   let sql = `delete from tbl_curso where id = '${id}'`;

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

const selectAllCursos = async function()
{
// Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
const { PrismaClient } = require('@prisma/client');

// Instancia da classe PrismaClient
const prisma = new PrismaClient(); 

// rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
// ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
// queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
const rsCursos = await prisma.$queryRawUnsafe `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso order by id desc`;



if (rsCursos.length > 0)  
{
    return rsCursos
}

else {
    return false; 
}

}

const selectCursoById = async function (id)
{
// Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
const { PrismaClient } = require('@prisma/client');

// Instancia da classe PrismaClient
const prisma = new PrismaClient(); 

// rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
// ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
// queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.

let sql = `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso where id = ${id}`



const rsCurso = await prisma.$queryRawUnsafe(sql);

if (rsCurso.length > 0)  
{
    return rsCurso
}

else {
    return false; 
}
}

module.exports = {
    insertCurso,
    deleteCurso,
    updateCurso,
    selectAllCursos,
    selectCursoById,
    
}