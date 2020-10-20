const {Router} = require("express")
const router = Router()
const fs = require("fs")
const estudiantesFile = fs.readFileSync("./estudiantes.json", "utf-8") // Lectura de archivo
const estudiantesJSON = JSON.parse(estudiantesFile) //Convertir archivo a JSON

//console.log(estudiantesJSON)

router.get("/", (req, res) => {
  res.send("API REST Estudiante")
})

router.get("/estudiantes", (req, res) => {
  res.json(estudiantesJSON)
})

router.get("/estudiantes/:id", (req, res) => {
    let id = req.params.id
  let estudiantEncontrado = estudiantesJSON.find (estudiante => estudiante.id == id)

  if (estudiantEncontrado != undefined)
  res.json(estudiantEncontrado)
  else 
  res.send(`Es estudiante con ID ${id} no existe`)
})

router.post("/estudiantes", (req, res) => {
  let {apellido, nombre, fecha_nacimiento} = req.body
  let id = estudiantesJSON.length + 1
  let nuevoEstudiante = {
    id: id,
    nombre: nombre,
    apellido: apellido,
    fecha_nacimiento
  }

  estudiantesJSON.push(nuevoEstudiante)

  res.status(201).json(nuevoEstudiante)
  console.log(apellido, nombre)
})

router.put("/estudiantes/:id", (req, res) => {
  let id = req.params.id
  let {apellido, nombre, fecha_nacimiento} = req.body

  let estudianteAModificar = estudiantesJSON.find(estudiante =>{
    if(estudiante.id==id){
      estudiante.nombre = nombre
      estudiante.apellido = apellido
      estudiante.fecha_nacimiento = fecha_nacimiento
      return estudiante
    }
  })

  if (estudianteAModificar != undefined){
    fs.writeFileSync("./estudiantes.json", JSON)
  }
  res.send("Modifica un estudiante")
})

router.delete("/estudiantes/:id", (req, res) => {
  res.send("Elimina un estudiante")
})

module.exports = router