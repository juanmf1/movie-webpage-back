const express = require ('express');

const router = express.Router();

const connection = require ("../connection");


router.get('/check', (req, res) => {
    if (req.session.user) {
      res.json({ message: 'ok', data: { name: req.session.user.name } });
    } else {
      res.json({ message: 'error', data: null });
    }
  });

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = ' SELECT * FROM usuarios WHERE email= ? AND password = ?'

    connection.query(sql, [email, password], (err, result)=>{
        if(err){
            console.log("Error al verificar usuarios");
        }else {
            if (result.length === 1){
                const nombre = `${result[0].nombre} ${result[0].apellido}`;

                req.session.user = {
                    name: nombre,
                    id: result[0].id,
                };
                
                res.json({message: "Usuario Valido", data: nombre,})
            } else {
                res.status(403).json({
                  message: "Usuario y/o contraseña no válidos",
                  data: null,
                });
        }
    }}
)});


//Cerrar sesion
router.delete('/', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error al cerrar la sesión', data: null });
      } else {
        res.json({ message: 'Sesión cerrada correctamente', data: null });
      }
    });
  });
  
module.exports = router;