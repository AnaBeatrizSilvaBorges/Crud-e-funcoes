/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamente e retorno de dados entre a API e a Model.
 * Autor: Ana Beatriz Silva
 * Data Criação: 06/10/2022
 * Versão: 1.0 
 *******************************************************************************************************************/

const e = require('cors');
const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

// Função para gerar um novo aluno
const novoAluno = async function (aluno) 
{

    
    if (aluno.nome == '' || aluno.foto == '' 
    || aluno.rg == '' || aluno.cpf == '' || aluno.email == ''|| aluno.data_nascimento == '' 
    || aluno.nome == undefined || aluno.foto == undefined || aluno.rg == undefined || aluno.cpf == undefined 
    || aluno.email == undefined || aluno.data_nascimento == undefined  )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    // Valida para verificar se o email é valido 
    else if (!aluno.email.includes('@')) 
    {
        return { status: 400, message: MESSAGE_ERROR.INVALIDE_EMAIL};
    }

    else 
    {
        
        // Import da model de Alunos
        const novoAluno = require('../model/DAO/aluno.js')
        // Import da model Aluno Curso (Tabela Intermediaria)
        const novoAlunoCurso = require('../model/DAO/alunoCurso.js')

        // Chama a funcao para inserir um novo aluno
        const resultNovoAluno = await novoAluno.insertAluno(aluno);
        

        // Verifica se os dados do aluno foram inseridos no Banco de Dados
        if(resultNovoAluno)
        {
            // Chama a funcao que verifica qual o id gerado para o novo Aluno
            let idNovoAluno = await novoAluno.selectLastId();

            if (idNovoAluno > 0)
            {
                //Cria um objeto JSON
                let alunoCurso = {};

                //Retorna o ano correte 
                let anoMatricula = new Date().getFullYear();

                // Cria a matricula do aluno (id_aluno + id_curso + ano_corrente)
                let numero_matricula = `${idNovoAluno} ${aluno.curso[0].id_curso}${anoMatricula}` 

                // Cria o objeto JSON com todas as chaves e valores
                alunoCurso.idAluno      = idNovoAluno;
                alunoCurso.idCurso     = aluno.curso[0].id_curso;
                alunoCurso.matricula    = numero_matricula
                alunoCurso.status_aluno = 'Cursando'

                // Chama a funcao para inserir na tabela alunoCurso
                const resultnovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso);

                console.log(resultnovoAlunoCurso);
                if (resultnovoAlunoCurso)
                {
                    return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};
                }

                else 
                {
                    // Caso aconteca um erro nesse processo, >
                    // > obrigatoriamente o registro do aluno devera ser excluido do BD
                    await excluirAluno(idNovoAluno)

                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
                }
            }
                else{
                    // Caso aconteca um erro nesse processo, >
                    // > obrigatoriamente o registro do aluno devera ser excluido do BD
                    await excluirAluno(idNovoAluno)

                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
                }
        }
                else 
                {
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
                }
    }
}

// Função para atualizar um registro
const atualizarAluno = async function (aluno) {

    // console.log(aluno)

    if (aluno.id == '' || aluno.id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    else if (aluno.nome == '' || aluno.foto == '' 
    || aluno.rg == '' || aluno.cpf == '' || aluno.email == ''|| aluno.data_nascimento == '' 
    || aluno.nome == undefined || aluno.foto == undefined || aluno.rg == undefined || aluno.cpf == undefined 
    || aluno.email == undefined || aluno.data_nascimento == undefined  )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    // Valida para verificar se o email é valido 
    else if (!aluno.email.includes('@')) 
    {
        return { status: 400, message: MESSAGE_ERROR.INVALIDE_EMAIL};
    }

    else {
        
        // Import da model de Alunos
        const atualizarAluno = require('../model/DAO/aluno.js')
        
        // Chama a funcao para atualizar um aluno
        const result = await atualizarAluno.updateAluno(aluno);
        
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

// Função para excluir um aluno
const excluirAluno = async function (id) 
{

    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const aluno = await buscarAluno(id)

        if (aluno)
    {
            // Import da model de Alunos
        const apagarAluno = require('../model/DAO/aluno.js')
        
        // Chama a funcao para atualizar um aluno
        const result = await apagarAluno.deleteAluno(id);
        
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
const listarAlunos = async function () {

    // let alunosCursoArray = [];
    let dadosAlunosJSON = {};

    // Import da model do aluno e do AlunoCurso
    const {selectAllAlunos} = require ('../model/DAO/aluno.js')
    const {selectAlunoCurso} = require ('../model/DAO/alunoCurso.js')

    // Busca todos os alunos
    const dadosAlunos = await selectAllAlunos();

    
    if (dadosAlunos) 
    {

        const alunosCursoArray =  dadosAlunos.map( async itemAluno => 
        {
        
        // Busca os dados referentes ao curso do aluno
        const dadosAlunoCurso = await selectAlunoCurso(itemAluno.id);

        if (dadosAlunoCurso)
        {
        // Acrescenta uma chave curso e coloca os dados do curso no aluno
        itemAluno.curso = dadosAlunoCurso;
        }
        
        else{
            itemAluno.curso = "Nenhum curso matriculado"
        }
       

        return itemAluno;

        });
        
        

        // Criamos uma chave alunos no JSON para retornar o array de alunos
        dadosAlunosJSON.alunos = await Promise.all(alunosCursoArray)

        return dadosAlunosJSON 

    }
        
    else 
    {
        return false; 
    }
}

// Função para retornar um registro baseado no Id
const buscarAluno = async function(id) {
    
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosAlunoJSON = {}

    const {selectAlunoById} = require ('../model/DAO/aluno.js')
    const {selectAlunoCurso} = require('../model/DAO/alunoCurso.js')

    const dadosAluno = await selectAlunoById(id);

    
    if (dadosAluno) 
    {
        
        const dadosAlunoCurso = await selectAlunoCurso(id)

        if (dadosAlunoCurso)
        {
        dadosAluno[0].curso = dadosAlunoCurso;
        dadosAlunoJSON.aluno = dadosAluno;
        return dadosAlunoJSON 
        }

        else
        {
            dadosAlunoJSON.aluno = dadosAluno;
            return dadosAlunoJSON
        }
        
}
        
    else 
    {
        return false; 
    }
    }
}


module.exports = {
    listarAlunos,
    novoAluno,
    atualizarAluno,
    excluirAluno,
    buscarAluno,
   
}




