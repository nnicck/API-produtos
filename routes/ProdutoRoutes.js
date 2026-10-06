import express from "express";

export function criarProdutoRoutes({ produtoController }){
    const router = express.Router();
    router.get("/", produtoController.listar);
    router.get("/:id", produtoController.buscar);
    router.get("/", produtoController.criar);
    return router;
}
