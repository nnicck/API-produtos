import express from 'express';
import { resolve } from 'node:path';
import { produtoRouter } from './routes/ProdutoRoutes.js';

export const app = express();

app.use(express.json());

// Permite acessar as fotos pelo navegador: http://localhost:3000/uploads/produtos/...
app.use('/uploads', express.static(resolve('uploads')));

// Log de requisições no console
app.use((req, res, next) => {
  const inicio = performance.now();
  res.once('finish', () => {
    const duracao = Math.round(performance.now() - inicio);
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} [${duracao}ms]`);
  });
  next();
});

// Rotas da API
app.get('/api/check', (_req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/produto', produtoRouter);

// Fallback 404 (Rota não encontrada)
app.use((req, res) => {
  res.status(404).json({ sucesso: false, erro: `A rota ${req.method} ${req.originalUrl} não existe.` });
});

// Tratador Global de Erros
app.use((erro, req, res, _next) => {
  console.error('Erro de Servidor:', erro.message);
  res.status(erro.status || 500).json({ sucesso: false, erro: erro.message || 'Falha interna do servidor.' });
});
