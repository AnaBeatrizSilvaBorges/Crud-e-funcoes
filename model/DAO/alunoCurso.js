/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD ( insert, update, delete, select )
 * Autor: Ana Beatriz Silva
 * Data Criação: 31/10/2022
 * Versão: 1.0 
 *********************************************************************************************************/

// Função para inserir um novo regristro no Banco
 const insertAlunoCurso= async function (alunoCurso) {

    try {
         // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');

    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 

    let sql = `insert into tbl_aluno_curso (id_aluno,
                                        id_curso,
                                        matricula,
                                        status_aluno)
                values('${alunoCurso.idAluno}',
                        '${alunoCurso.idCurso}',
                        '${alunoCurso.matricula}',
                        '${alunoCurso.status_aluno}');`;
        
    // Executa o script sql no Banco de Dados
    // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
    const result = await prisma.$executeRawUnsafe(sql);

    // console.log(result);


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

// Função para buscar os dados de curso referente a um aluno
const selectAlunoCurso = async function(idAluno){
// Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
const { PrismaClient } = require('@prisma/client');

// Instancia da classe PrismaClient
const prisma = new PrismaClient(); 

let sql = `select cast(tbl_curso.id as float) as id_curso, tbl_curso.nome as nome_curso, tbl_curso.carga_horaria, tbl_curso.sigla as sigla_curso,
tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno from tbl_aluno
inner join tbl_aluno_curso 
    on tbl_aluno.id = tbl_aluno_curso.id_aluno 
inner join tbl_curso
    on tbl_curso.id = tbl_aluno_curso.id_curso
    where tbl_aluno.id = ${idAluno};`

    const rsAlunoCurso = await prisma.$queryRawUnsafe(sql);
 
    if (rsAlunoCurso.length > 0)  
    {
        return rsAlunoCurso;
    }
 
    else {
        return false; 
    }
}

module.exports = {
    insertAlunoCurso,
    selectAlunoCurso

}