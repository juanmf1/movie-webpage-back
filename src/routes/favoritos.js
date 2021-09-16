const express = require("express");

const router = express.Router();

const connection = require("../connection");

router.get("/user", (req,res)=>{
  const sql =`SELECT * FROM favoritos WHERE id = ?`

  connection.query(sql, [req.session.user.id], (err, result)=>{
    if(err){
      console.log(err);
      console.log("Error al recolectar favoritos");
    } else {
      res.json({message: "Favoritos recolectados", data: result})
    }
  })
})

router.get("/:id", (req, res) => {
  const sql = `SELECT * FROM favoritos WHERE id=? AND movie_id= ?`;

  const values = [req.session.user.id, req.params.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error al recolectar favoritos");
      console.log(err);
    } else {
      if (result.length === 1) {
        res.json({ message: "hay favorito" });
      } else {
        res.json({ message: "no hay favorito"});
      }
    }
  });
});

router.post("/:id", (req, res) => {
  const sql = `INSERT INTO favoritos(id , movie_id, movie_name, movie_cover) VALUES (?, ?, ?, ?)`;

  const values = [req.session.user.id, req.params.id, req.body.movieName, req.body.movieCover];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error al agregar a favoritos");
      console.log(err);
      res.json({ message: "Error al agregar a favoritos" });
    } else {
      res.json({ message: "Agregado a favoritos correctamente", data: null });
    }
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM favoritos WHERE id = ? AND movie_id = ?";

  const values = [req.session.user.id, req.params.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error al borrar favoritos");
      console.log(err);
    } else {
      res.json({ message: "Eliminado de favoritos", data: null });
    }
  });
});

module.exports = router;
