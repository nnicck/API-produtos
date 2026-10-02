//A rota vai receber a requisição
// A requisição vai falar que es
//Pega a requisição e encaminha pra o serviço
//Controller é o garçom pega a requisição e leva para o serviço

export function criarProdutoController({produtoService}){
    async function listar(req, res, next) {
        //Verificações adicionais
        try{
            const produtos = await produtoService.listar(); 
            res.status(200).json({sucesso: true, dados:produtos});

        } catch(erro){
            next(erro);
        }
    }

    //GET   req.params.id
    async function buscar(req, res, next) {
        try{
            const produto = await produtoService.buscarPorId(req.params.id);
            res.status(200).json({sucesso: true, dados: produto});
        } catch(erro){
            if(erro instanceof TypeError) 
                return res.status(400).json({erro: erro.message});
            if(erro.message.includes('não foi encontrado'))
                return res.status(400);
            json({erro: erro.message});
            next(erro);
        }
        
    }

    //POST   req.body
    async function criar(req, res, next) {
        try{
            const produtoNovo = await produtoService.criar(req.body);
            res.status(201).json({sucesso: true, dados: produtoNovo});
        } catch(erro){
            res.status(400).json({sucesso: false, erro: erro.message});

        }
        
    }

    return {listar, buscar, criar};
};