//? Puerto
process.env.PORT = process.env.PORT || 3000;

//? Entorno
let environment;
if (process.env.NODE_ENV === undefined) {
    environment = "dev";
}
//?Base de datos
let urlDB;
if (environment === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
}
else {
    // urlDB = "mongodb+srv://edgarplazola:nji90okm@cluster0-v16z7.mongodb.net/cafe?retryWrites=true&w=majority";
    urlDB = process.env.MONG_URI
}

process.env.URLDB = urlDB;

//? Vencimiento del token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//? SEED de autenticación

process.env.SEED = "secret_seed"