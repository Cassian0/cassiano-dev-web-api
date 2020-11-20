const cors = require ('cors');
const express = require('express');

const routes = require('./routes');
const logRequests = require('./middlewares');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use(routes);

/*Ouvindo portas "PORT" no caso do Heroku para usarmos o servidor Heroku*/
//3000 para rodarmos localmente
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor iniciado com sucesso!');
});
