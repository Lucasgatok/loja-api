const express = require('express')
const CategoriaControler = require('../controllers/CategoriasController')
const ProdutoControler = require('../controllers/ProdutoController')
const routes = express.Router()

routes.post('/cadastrarcategoria',CategoriaControler.CadastrarCategoria)
routes.get('/buscarcategoria',CategoriaControler.ListarCategoria)
routes.put('/atualizarcategoria/:id',CategoriaControler.AtualizarCategoria)
routes.delete('/deletarcategoria/:id',CategoriaControler.DeletarCategoria)
routes.post('/cadastrarproduto',ProdutoControler.CadastarProduto)
routes.get('/ListarProduto',ProdutoControler.ListarProduto)
routes.put('/AtualizarProduto/:id',ProdutoControler.AtualizarProduto)
routes.delete('/DeletarProduto/:id',ProdutoControler.DeletarProduto)



module.exports = routes