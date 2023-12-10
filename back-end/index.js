const express = require("express");
const pacienteController = require("./controller/pacienteController");
const vacinaAplicadaController = require("./controller/vacinaAplicadaController");
const campanhaController = require("./controller/campanhaController");
const vacinaCosultaAnoController = require("./controller/vacinaCosultaAno");
const vacinaController = require("./controller/vacinaController");
const vacinaPacienteController = require("./controller/vacinaPacienteController");
const vacinaCosultames = require("./controller/vacinaCosultames");
const vacinaController = require("./controller/vacinaController");


const app = express();

//MIDDLEWARE
app.use(express.json());

//app.use('/cadastro', cadastro)

//const cadastro = require('./routes')

app.get("/paciente/:id", pacienteController.consultaPaciente);
app.post("/paciente", pacienteController.cadastroPaciente);
app.post("/paciente", pacienteController.atualizaPaciente);

app.get(
  "/vacinaAplicada/:idPaciente",
  vacinaAplicadaController.consultaVacinaPaciente
);
app.post(
  "/vacinaAplicada/:idPaciente",
  vacinaAplicadaController.cadastroVacinaPaciente
);
app.delete(
  "/vacinaAplicada/:idPaciente/:idVacina",
  vacinaAplicadaController.excluirVacinaPaciente
);


app.get("/vacina/:doencaProtecao", vacinaController.consultaVacinaProtecao);

app.get(
  "/ConsultaVacinaPaciente/:id",
  vacinaPacienteController.consultaVacinaPaciente
);
app.get(
  "/ConsultaVacinaPendente/:id",
  vacinaPacienteController.consultaVacinaPendente
);

app.post("/campanha", campanhaController.cadastroCampanhaDeVacinacao);
app.patch(
  "/campanha/:idCampanha",
  campanhaController.edicaoCampanhaDeVacinacao
);
app.post("/campanha/vacina", campanhaController.cadastroDeVacinaEmUmaCampanha);
app.delete(
  "/campanha/:idCampanha/:idVacina",
  campanhaController.deletarVacinaDeUmaCampanha
);
app.post("/campanha/data", campanhaController.consultaCampanhaPorData);
app.get(
  "/campanha/:doencaProtecao",
  campanhaController.consultaCampanhaProtecaoDaVacina
);

app.get("/vacina/consulta", vacinaController.consultaVacina);
app.get("/vacina/consultarAno/:ano", vacinaController.consultarAno);
app.get("/vacina/consultaIntervaloAnual/:inicio/:fim", vacinaController.consultaIntervaloAnual);
app.get("/vacina/consultaIntervaloMensal/:inicio/:fim", vacinaController.consultaIntervaloMensal);
app.get("/vacina/consultaMensal/:mes", vacinaController.consultaMensal);

app.listen(3000, () => {
  console.log("> Server is running");
});
