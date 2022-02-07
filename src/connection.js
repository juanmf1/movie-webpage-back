const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b1eefbff57bd10",
  password: "5a4c57bc",
  database: "heroku_473031a1bc8de87",
});

connection.connect((error) => {
  if (error) {
    console.log("Hubo un problema al conectarse a la base de datos");
  } else {
    console.log("Conectado a la base de datos");
  }
});

module.exports = connection;
