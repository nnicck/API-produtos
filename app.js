import express from "express";
import {criarPool} from './config/database.js';
import { criarProdutoModel } from "./models/ProdutoModel.js";
import { criarProdutoController } from "./controllers/ProdutoControllers.js"
import { criarProdutoService } from "./services/ProdutoService.js";
import { criarProdutoRoutes } from "./routes/ProdutoRoutes.js";



export const app = express();

//um middlewehre do proprio express da manipulação de json
//Middlewhere: É uma função do express que le o json do corpo da rquisição
app.use(express.json()); //Normalmente indica que estamos usando um middlewhere

//Conexão
const pool = criarPool();
const produtoModel = criarProdutoModel({pool});
const produtoService = criarProdutoService({produtoModel});
const produtoController = criarProdutoController({produtoService});
const produtoRoutes = criarProdutoRoutes({produtoController});


app.get('/api/check', (req, res)=>{
    res.status(200).json({status:'ok', mensagem: 'Servidor funcionando via HTTP!'});
});

app.use('/api/produto', produtoRoutes);

app.use((req, res)=>{
    res.status(404).json({erro: `A rota ${req.method} ${req.originalUrl} não existe`});
});

app.use((erro, req, res, _next)=>{
    console.error(`Erro de sistema: ${erro.message}`);
    res.status(500).json({erro: 'Falha interna do servidor'});
});



