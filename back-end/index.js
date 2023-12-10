const express = require("express");
const pacienteController = require("./controller/pacienteController");
const vacinaAplicadaController = require("./controller/vacinaAplicadaController");

const app = express();

//MIDDLEWARE
app.use(express.json());

//app.use('/cadastro', cadastro)

//const cadastro = require('./routes')

app.get("/paciente/:id", pacienteController.consultaPaciente);
app.post("/paciente", pacienteController.cadastroPaciente);
app.post("/paciente", pacienteController.atualizaPaciente);

app.get("/vacinaAplicada/:idPaciente", vacinaAplicadaController.consultaVacinaPaciente);
app.post("/vacinaAplicada/:idPaciente", vacinaAplicadaController.cadastroVacinaPaciente);
app.delete("/vacinaAplicada/:idPaciente/:idVacina", vacinaAplicadaController.excluirVacinaPaciente);



app.listen(3000, () => {
  console.log("server rodando");
});
