import sqlite3 from 'sqlite3'
sqlite3.verbose()
const db = new sqlite3.Database('./mydata.sql')

//  status: feito, em progresso, não iniciada

// prioridade: alta, baixo, media
db.serialize(() => {
    db.run('create table if not exists tarefas(id_tarefas int auto_increment, nome_tarefa text,status text, prioriade text, data_inicial date, data_final date )')
    console.log('data create')
})

db.close()

// variavel para conexão com o banco de dados
export default db 	
