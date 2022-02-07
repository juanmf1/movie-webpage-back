const express = require("express");
const app = express();
const connection = require("./connection");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const PORT = process.env.PORT || 8000;

// HAY QUE PONERLO ARRIBA PORQUE SINO NO LEE JSON EN LAS RUTAS DE ABAJO

app.use(express.json());

app.use(cors());

app.use(
  session({
    secret: "635241",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    name: "movie-web",
  })
);


// RUTAS
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const favoritosRoutes = require ("./routes/favoritos");


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use ("/favoritos", favoritosRoutes);

app.listen(process.env.PORT ||8000);
