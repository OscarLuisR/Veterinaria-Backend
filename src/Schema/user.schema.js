// COPIAR ...
const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema (
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        rol: { type: Schema.Types.ObjectId, ref: 'Roles'}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = userSchema;