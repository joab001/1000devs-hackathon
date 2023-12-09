const express = require("express");
const pacienteController = require("./controller/pacienteController");

const app = express();

//MIDDLEWARE
app.use(express.json());

//app.use('/cadastro', cadastro)

//const cadastro = require('./routes')

app.listen(3000, () => {
  console.log("server rodando");
});

app.get("/paciente/:id", pacienteController.consultaPaciente);
app.post("/paciente", pacienteController.cadastroPaciente);
app.put("/paciente/:id", pacienteController.atualizaPaciente);