/********************************************************************************************************************
 * Objetivo: API responsável pela manipulacao de dados do Backend (get, post, put, delete)
 * Autor: Ana Beatriz Silva
 * Data Criação: 10/10/2022
 * Versão: 1.0 
 * 
 * Anotações:
 * express
 * cors
 * body-parser
 * npm prisma --save
 * npx prisma
 * npx prisma init 
 * npm install @prisma/client
 *******************************************************************************************************************/

// Import das bibliotecas 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('./modulo/config.js')

const {listarAlunos} = require('./controller/controllerAluno')
const {sellectAllAlunos} = require('./model/DAO/aluno')

const app = express();

// Configuração de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header ('Acess-Control-Allow-Origin', '*');

    // Permite especificar quais serão os verbos (metodos) que a API irá reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Estabelece que as permissoes acima serão representadas pelo cors
    app.use(cors());

    // Para pular para a próxima configuração
    next();

});

const jsonParser = bodyParser.json()

/***************************
* Rota para CRUD de alunos;
* CRUD = Create, Read, Update, Delete;
* Data: 10/10/2022;
****************************/

app.get('/v1/alunos', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerAluno = require('./controller/controllerAluno.js')

    // Retorna todos os alunos existentes no banco de dados
    const dadosAlunos = await controllerAluno.listarAlunos();
   
    
    // Valida se existe retorno de dados
    if (dadosAlunos) 
    {
        statusCode = 200;
        message = dadosAlunos;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});


// EndPoint para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerAluno =  require('./controller/controllerAluno.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoAluno = await controllerAluno.novoAluno(dadosBody)

            statusCode = novoAluno.status
            message = novoAluno.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})


// EndPoint para atualizar aluno existente
app.put('/v1/aluno/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Recebe o Id enviado por parâmetro na requisição
            let id = request.params.id;

            // Validação do Id na requisição
            if(id != " " && id != undefined)
            {
            
            // Adiciona o Id no JSON que chegou no corpo da requisição
            dadosBody.id = id;

            // Import do arquivo da controller de aluno
            const controllerAluno =  require('./controller/controllerAluno.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoAluno = await controllerAluno.atualizarAluno(dadosBody)

            statusCode = novoAluno.status
            message = novoAluno.message
            } 

            else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }
            
        }

            else 
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// EndPoint para excluir aluno existente
app.delete('/v1/aluno/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerAluno =  require('./controller/controllerAluno.js')

            // Validar se existe o ID no Banco de Dados
            const buscarAluno = await controllerAluno.buscarAluno(id)

            // Chamando a funcao para excluir um item
            const aluno = await controllerAluno.excluirAluno(id)

            statusCode = aluno.status
            message = aluno.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// EndPoint para buscar um aluno pelo seu id
app.get('/v1/aluno/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerAluno = require('./controller/controllerAluno.js')

        // Retorna todos os alunos existentes no banco de dados
        const dadosAluno = await controllerAluno.buscarAluno(id);
    
    

    // Valida se existe retorno de dados
    if (dadosAluno) 
    {
        statusCode = 200;
        message = dadosAluno;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    } 
    
    else
    {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID
    }
    
     response.status(statusCode)
     response.json(message);

});

// ####################################################################################

/***************************
* Rota para CRUD de cursos;
* CRUD = Create, Read, Update, Delete;
* Data: 27/10/2022;
****************************/

// Listar Todos os Cursos
app.get('/v1/cursos', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerCurso = require('./controller/controllerCurso.js')

    // Retorna todos os alunos existentes no banco de dados
    const dadosCursos = await controllerCurso.listarCursos();

    // Valida se existe retorno de dados
    if (dadosCursos) 
    {
        statusCode = 200;
        message = dadosCursos;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});

// Inserir um novo Curso
app.post('/v1/curso', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerCurso =  require('./controller/controllerCurso.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoCurso = await controllerCurso.novoCurso(dadosBody)

            statusCode = novoCurso.status
            message = novoCurso.message
           
            
        }

            else 
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Atualizar dados de um curso existente 
app.put('/v1/curso/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Recebe o Id enviado por parâmetro na requisição
            let id = request.params.id;

            // Validação do Id na requisição
            if(id != " " && id != undefined)
            {
            
            // Adiciona o Id no JSON que chegou no corpo da requisição
            dadosBody.id = id;

            // Import do arquivo da controller de aluno
            const controllerCurso =  require('./controller/controllerCurso.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoCurso = await controllerCurso.atualizarCurso(dadosBody)

            statusCode = novoCurso.status
            message = novoCurso.message
            } 

            else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }
            
        }

            else 
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Apagar um curso existente
app.delete('/v1/curso/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerCurso=  require('./controller//controllerCurso.js')

            // Validar se existe o ID no Banco de Dados
            const buscarCurso = await controllerCurso.buscarCurso(id)

            // Chamando a funcao para excluir um item
            const curso = await controllerCurso.excluirCurso(id)

            statusCode = curso.status
            message = curso.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// Buscar um curso pelo Id
app.get('/v1/curso/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerCurso = require('./controller/controllerCurso.js')

        // Retorna todos os alunos existentes no banco de dados
        const dadosCurso = await controllerCurso.buscarCurso(id);
    
    

    // Valida se existe retorno de dados
    if (dadosCurso) 
    {
        statusCode = 200;
        message = dadosCurso;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    } 
    
    else
    {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID
    }
    
     response.status(statusCode)
     response.json(message);

});

/***************************
* Rota para CRUD de AlunoCurso;
* CRUD = Create, Read, Update, Delete;
* Data: 03/11/2022;
****************************/


// Ativa o servidor para receber requisições http
app.listen(8080, function(){
    console.log('Servidor aguardando requisições.')

});