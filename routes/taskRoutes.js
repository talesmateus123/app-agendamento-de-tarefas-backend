import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

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

// POST /tarefas
// - Criar nova tarefa
// - Validar e salvar no banco

router.post('/tarefas', async (req, res) => {
  const { nome_tarefas, status, prioridade, data_inicial, data_final } = req.body;

  // Validação básica
  if (!nome_tarefas || !status || !data_inicial || !data_final) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome_tarefas, status, data_inicial, data_final' });
  }

  try {
    const task = await Task.create({
      nome_tarefas,
      status,
      prioridade,
      data_inicial,
      data_final,
    });

    res.json({ message: 'Tarefa criada com sucesso', task });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// PUT /tarefas/:id — Atualizar tarefa existente
router.put('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_tarefas, status, prioridade, data_inicial, data_final } = req.body;

  // Validação básica
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

// DELETE /tarefas/:id — Excluir tarefa existente
router.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.destroy();

    res.status(204).send(); // Resposta sem conteúdo para sucesso
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao excluir tarefa' });
  }
});

export default router;