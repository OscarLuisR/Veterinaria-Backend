const mongoose = require('mongoose');
const message = require('../libs/message');

let conn = null;

try {
    // Crea la cadena de conexion
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1dmfw.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

    conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
    });

    conn.model('Mascotas', require('../Schema/mascota.schema'));
    
    console.log(message.ok(` Conectado a la Base de Datos ${process.env.DATABASE} `));

    } catch (error) {
        console.log(message.error(` Error: ${error} `));
}

module.exports = conn;