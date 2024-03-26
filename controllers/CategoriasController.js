const { Categoria, Produto } = require("../models")

class CategoriaControler {
    static async ListarCategoria(req, res) {
        try {
            const categorias = await Categoria.findAll({
                include: [{
                    model: Produto,
                    as: 'produtos',
                    attributes: ['descricao', 'id']
                }]
            })
            if (categorias.length > 0) {
                res.status(200).json({
                    data: categorias
                })
            }
            else {
                res.status(501).json({
                    message: 'não existe categorias cadastradas'
                })
            }

        } catch (error) {
            res.status(400).json({
                error: true,
                message: error.message
            })
        }
    }

    static async CadastrarCategoria(req, res) {
        try {
            const categoria = await Categoria.findOne({
                where: {
                    descricao: req.body.descricao
                }
            })
            if (categoria) {
                res.status(400).json({
                    message: 'essa categoria já existe'
                })
            }
            else {
                Categoria.create({
                    descricao: req.body.descricao
                })
                res.status(200).json({
                    message: 'categoria criada com sucesso'
                })
            }

        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async AtualizarCategoria(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id)
            const catigual = await Categoria.findOne({
                where: {
                    descricao: req.body.descricao
                }
            })
            if (categoria) {
                if (catigual) {
                    res.status(400).json({
                        message: 'essa categoria já existe'
                    })
                }
                else {
                    categoria.update({
                        descricao: req.body.descricao
                    })
                    res.status(200).json({
                        message: 'categoria alterada com sucesso'
                    })
                }
            }
            else {
                res.status(400).json({
                    message: 'Essa categoria não existe'
                })
            }
        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async DeletarCategoria(req, res){
        try {
            const categoria = await Categoria.findByPk(req.params.id)
            const produtocat = await Produto.findAll({
                where: {
                    categoriaID: categoria.id
                }
            })
            if (categoria) {
                if(produtocat){
                    await Produto.destroy({
                        where:{
                            categoriaID: categoria.id
                        }
                    })
                }
                await categoria.destroy()
                res.status(200).json({
                    message: ' coisacoisado com sucesso'
                })
            } else {
                return res.status(400).json({
                    message:'Essa categoria não existe verifique o ID'
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

    


module.exports = CategoriaControler