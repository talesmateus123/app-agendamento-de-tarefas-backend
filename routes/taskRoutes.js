//Esse arquivo cria um conjunto de rotas ,funçoes como:
//Criar ,Buscar ,Atualizar ,Excluir

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/* 
  "POST /tarefas"
  - Criar nova tarefa
  - Validar e salvar no banco
*/

/*
  "GET /tarefas/:userId"
  - Listar tarefas de um usuário
*/

/*
  "DELETE /tarefas/:id"
  - Remover tarefa pelo ID
*/

// PUT /tarefas/:id — Atualizar tarefa existente
router.put('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_tarefas, status, prioridade, data_inicial, data_final } = req.body;

 
  if (!nome_tarefas || !status || !data_inicial || !data_final) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome_tarefas, status, data_inicial, data_final' });
  }

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    task.nome_tarefas = nome_tarefas;
    task.status = status;
    task.prioridade = prioridade;
    task.data_inicial = data_inicial;
    task.data_final = data_final;

    await task.save();

    res.json({ message: 'Tarefa atualizada com sucesso', task });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar tarefa' });
  }
});

module.exports = router;
