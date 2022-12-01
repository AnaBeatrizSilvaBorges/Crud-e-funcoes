const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

// Funcao para inserir um novo curso
const novoCurso = async function (curso) {
    if (curso.nome == '' || curso.carga_horaria == '' 
    || curso.icone == '' 
    || curso.nome == undefined || curso.carga_horaria == undefined || curso.icone == undefined  )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    else  {
        
        // Import da model de Cursos
        const novoCurso = require('../model/DAO/curso.js')
        
        // Chama a funcao para inserir um novo curso
        const result = await novoCurso.insertCurso(curso);
        
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};
            
        }
        
        
        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
        
        
        
        }
    }


// Função para atualizar um registro
const atualizarCurso = async function (curso) {
    if (curso.id == '' || curso.id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    else if (curso.nome == '' || curso.carga_horaria == '' 
    || curso.icone == '' || curso.sigla == '' 
    || curso.nome == undefined || curso.carga_horaria == undefined || curso.icone == undefined 
    || curso.sigla == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

   else {
        
        // Import da model de Cursos
        const atualizarCurso = require('../model/DAO/curso.js')
        
        // Chama a funcao para atualizar um curso
        const result = await atualizarCurso.updateCurso(curso);
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};
        }
        

        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
        
        
        
        }
}
     
const excluirCurso = async function (id) 
{
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const curso = await buscarCurso(id)

        if (curso)
    {
            // Import da model de Cursos
        const apagarCurso = require('../model/DAO/curso.js')
        
        // Chama a funcao para excluir um curso
        const result = await apagarCurso.deleteCurso(id);
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.DELETE_ITEM};
        }
        
        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    
    }

    else 
    {
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}
}

   
// Função para retornar todos os registros
const listarCursos = async function () {

    let dadosCursosJSON = {}

    const {selectAllCursos} = require ('../model/DAO/curso.js')

    const dadosCursos = await selectAllCursos();

    
    if (dadosCursos) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosCursosJSON.alunos = dadosCursos
    return dadosCursosJSON 

    
    }
        
    else 
    {
        return false; 
    }
}

    

// Função para retornar um registro baseado no Id
const buscarCurso = async function(id) {
     // Validação do Id como campo obrigatório
     if (id == '' || id == 'undefined') 
     {
         return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
     }
     
     else
     { 
     let dadosCursoJSON = {}
 
     const {selectCursoById} = require ('../model/DAO/curso.js')
 
     const dadosCurso = await selectCursoById(id);
 
     
     if (dadosCurso) 
     {
         
     // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
     dadosCursoJSON.curso = dadosCurso
     return dadosCursoJSON 
 
     }
         
     else 
     {
         return false; 
     }
     }
}

module.exports = {
    listarCursos,
    novoCurso,
    excluirCurso,
    
    buscarCurso,
    atualizarCurso
}
    
   
        
    