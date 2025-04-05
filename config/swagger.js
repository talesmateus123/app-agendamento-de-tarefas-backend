import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Api para um task manager',
        version: '1.0.0',
        description: 'Documentação do projeto do taskmanager'
    },
    servers: [
                {
                url: 'http://localhost:3333',
                description: 'servidor local'

                },
             ]

};
const options ={
    swaggerDefinition,
    apis: ['./routes/*js']

}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app)=> {
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
}

export default setupSwagger;