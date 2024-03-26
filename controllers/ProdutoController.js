const {Produto, Categoria} = require("../models")

class ProdutoControler{
    static async ListarProduto(req, res) {
        try {
            const produtos = await Produto.findAll()
            if (produtos.length > 0) {
                res.status(200).json({
                    data: produtos
                })
            }
            else {
                res.status(501).json({
                    message: 'não existe produtos cadastradas'
                })
            }

        } catch (error) {
            res.status(400).json({
                error: true,
                message: error.message
            })
        }
    }


    static async CadastarProduto(req,res){
        try {
            const produto = await Produto.findOne({
                where:{
                    descricao:req.body.descricao
                }
            })
            if (produto) {
                res.status(400).json({
                    message:"esse produto já existe"
                })

                
            } else {
                await Produto.create({
                    descricao:req.body.descricao,
                    qtd:req.body.qtd,
                    categoriaID:req.body.categoriaID
                })
                res.status(200).json({
                    message:"Produto cadastrado com sucesso"
                })
            }

        } catch (error) {
            res.status(404).json({
                error:true,
                message:error.message
            })
        }
    }
    static async AtualizarProduto(req, res) {
        try {
            // Busca o produto pelo ID
            const produto = await Produto.findByPk(req.params.id)
    
            // Verifica se o produto existe
            if (!produto) {
                return res.status(404).json({
                    error: true,
                    message: 'O produto não foi encontrado.'
                })
            }
    
            // Verifica se o nome do produto está sendo alterado
            if (req.body.descricao !== produto.descricao) {
                // Verifica se já existe outro produto com o mesmo nome
                const produtoExistente = await Produto.findOne({
                    where: {
                        descricao: req.body.descricao
                    }
                })
                // Se existir e não for o mesmo produto que está sendo atualizado, retorna erro
                if (produtoExistente && produtoExistente.id !== req.params.id) {
                    return res.status(400).json({
                        message: 'O nome do produto já está em uso.'
                    })
                }
            }
    
            // Atualiza o produto
            await produto.update({
                descricao: req.body.descricao || produto.descricao,
                qtd: req.body.qtd || produto.qtd,
                categoriaID: req.body.categoriaID || produto.categoriaID
            })
    
            return res.status(200).json({
                message: 'Produto alterado com sucesso.'
            })
    
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }
    

    static async DeletarProduto(req, res){
        try {
            const produto = await Produto.findByPk(req.params.id)
            if (produto) {
                await produto.destroy()
                res.status(200).json({
                    message: 'Produto deletado com sucesso'
                })
                
            } else {
                return res.status(400).json({
                    message:'Esse produto não existe verifique o ID'
                })
                
            }
        } catch(error){
            res.status(404).json({
                error:true,
                message: error.message
            })
        }
    }
}

module.exports = ProdutoControler