import express from 'express';

//Servidor chama essa rota de produtos
//E vai ter essa rotas para cada coisa

export function criarProdutoRoutes({produtoController}){
    const router = express.Router();
    router.get('/', produtoController.listar);
    router.get(':id', produtoController.buscar);
    router.post('/', produtoController.criar);
    return router;
}