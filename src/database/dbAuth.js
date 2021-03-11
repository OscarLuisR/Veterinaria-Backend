// COPIAR ...
const mongoose = require('mongoose');
const message = require('../libs/message');

let connAuth = null;

try {
    // Crea la cadena de conexion
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1dmfw.mongodb.net/${process.env.DB_AUTH}?retryWrites=true&w=majority`;

    connAuth = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
    });

    connAuth.model('Users', require('../Schema/user.schema'));
    connAuth.model('Roles', require('../Schema/role.schema'));

    console.log(message.okAuth(` Conectado a la Base de Datos ${process.env.DB_AUTH} `));

    } catch (error) {
        console.log(message.error(` Error: ${error} `));
}

module.exports = connAuth;