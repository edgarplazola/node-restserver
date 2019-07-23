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

process.env.CADUCIDAD_TOKEN = "48h";

//? SEED de autenticación

process.env.SEED = "secret_seed"


//? Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || "365685698347-aish7ei1tlfqbh8qfgbflfv8pa2v5tqp.apps.googleusercontent.com";
