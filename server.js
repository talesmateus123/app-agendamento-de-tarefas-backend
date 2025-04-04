import { Connection } from './db.js';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';


Connection()
const Port = 3333

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(Port, ()=> {console.log('Sever rodando no http://Localhost:'+ Port )})
