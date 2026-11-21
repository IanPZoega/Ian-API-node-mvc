// Camada MODEL: único lugar onde existem instruções SQL (sempre parametrizadas).
const db = require('../config/db');

const usuarioModel = {
  async listarTodos() {
    const [linhas] = await db.query('SELECT * FROM usuarios');
    return linhas;
  },

  async buscarPorId(id) {
    const [linhas] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return linhas[0] || null;
  },

  async criar({ nome, email }) {
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return resultado.insertId;
  },

  async atualizar(id, { nome, email }) {
    const [resultado] = await db.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    return resultado.affectedRows;
  },

  async remover(id) {
    const [resultado] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return resultado.affectedRows;
  }
};

module.exports = usuarioModel;
