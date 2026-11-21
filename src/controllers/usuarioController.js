// Camada CONTROLLER: valida a entrada, chama a Model e devolve a resposta HTTP (JSON = "View").
const usuarioModel = require('../models/usuarioModel');

const idValido = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const usuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.listarTodos();
      res.status(200).json(usuarios);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'erro ao buscar usuários' });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;

    if (!idValido(id)) {
      return res.status(400).json({ erro: 'id inválido' });
    }

    try {
      const usuario = await usuarioModel.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ erro: 'usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'erro ao buscar usuário' });
    }
  },

  async criar(req, res) {
    const { nome, email } = req.body || {};

    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email são obrigatórios' });
    }

    try {
      const id = await usuarioModel.criar({ nome, email });
      res.status(201).json({ id, nome, email });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'erro ao cadastrar usuário' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body || {};

    if (!idValido(id)) {
      return res.status(400).json({ erro: 'id inválido' });
    }

    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email são obrigatórios' });
    }

    try {
      const afetadas = await usuarioModel.atualizar(id, { nome, email });

      if (afetadas === 0) {
        return res.status(404).json({ erro: 'usuário não encontrado' });
      }

      res.status(200).json({ id: Number(id), nome, email });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'erro ao atualizar usuário' });
    }
  },

  async remover(req, res) {
    const { id } = req.params;

    if (!idValido(id)) {
      return res.status(400).json({ erro: 'id inválido' });
    }

    try {
      const afetadas = await usuarioModel.remover(id);

      if (afetadas === 0) {
        return res.status(404).json({ erro: 'usuário não encontrado' });
      }

      res.status(200).json({ mensagem: 'usuário removido' });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'erro ao remover usuário' });
    }
  }
};

module.exports = usuarioController;
