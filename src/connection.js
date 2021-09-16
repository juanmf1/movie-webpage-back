const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie-webpage",
});

connection.connect((error) => {
  if (error) {
    console.log("Hubo un problema al conectarse a la base de datos");
  } else {
    console.log("Conectado a la base de datos");
  }
});

module.exports = connection;
