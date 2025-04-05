import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import './database/db.js'
import setupSwagger from './config/swagger.js'; './config/swagger.js'


const Port = 3333
const app = express()
app.use(cors())
setupSwagger(app);
app.use(bodyParser.json())
app.listen(Port, ()=> {
    console.log('Sever rodando no http://Localhost:'+ Port )
    console.log(`Servidor de documentos rodando em http://localhost:${Port}/api-docs`);
})
