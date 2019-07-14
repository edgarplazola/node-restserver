const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let validRoles = {
    values: ["MASTER", "ADMIN"],
    message: "{VALUE} no es un rol válido"
};
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre del usuario es necesario"]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contrasena es obligatoria"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRoles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: "{PATH} debe de ser único"
});

module.exports = mongoose.model("Usuario", usuarioSchema);

//? BCRYPT hash de una sola vía: aunque el usuario o un tercero obtenga todo el código generado, no podrá reconstruirlo