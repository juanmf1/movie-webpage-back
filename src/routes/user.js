const express = require("express");

const router = express.Router();

const connection = require("../connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE id = ?";

  connection.query(sql, [req.session.user.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
    const sql = "INSERT INTO usuarios VALUES (?, ?, ?, ?, ?, ?)";
  
    const values = [
      req.session.id,
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.dni,
      req.body.password,
    ];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log("Error al registrarse");
        console.log(err);
      } else {
        console.log("Registrado exitosamente");
        res.json({ message: "Registrado exitosamente", data: null });
      }
    });
  });

router.put("/", (req, res) => {
  const sql = "UPDATE usuarios SET email = ?, password = ?, nombre = ?, apellido = ?, dni = ? WHERE id = ?"

  const values = [
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.surname,
      req.body.dni,
      req.session.user.id,
  ]

  connection.query(sql, values, (err,result)=>{
      if(err){
          console.log("Error al modificar usuario");
          console.log(err)
      } else {
          console.log(result);
          console.log("Modificado correctamente");
          res.status(200).json({message:"Usuario modificado correctamente", data: null})
      }
  })
});

module.exports = router;
