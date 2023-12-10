const pool = require("../database/index.js");

exports.cadastroCampanhaDeVacinacao = async (req, res) => {
  try {
    const { descricao, dataInicio, dataFim } = req.body;
    const resultId = await pool.query(
      "select max(ID_CAMPANHA) + 1 as nextId from CAMPANHA"
    );
    const nextId = resultId.rows[0]["nextId"];
    const result = await pool.query(
      "insert into CAMPANHA(ID_CAMPANHA, DESCRICAO, DATA_INICIO, DATA_FIM) values ($1, $2, $3, $4) RETURNING *",
      [nextId, descricao, dataInicio, dataFim]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "There was an error while adding the vaccination's campaign",
    });
  }
};

exports.edicaoCampanhaDeVacinacao = async (req, res) => {
  try {
    const {idCampanha} = req.params;
    //const { descricao, dataInicio, dataFim }
    const result = await pool.query(

    );
    return res.json(result.rows[0]);  
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "There was an error while editing the vaccination's campaign"
    });
  }
};

exports.cadastroDeVacinaEmUmaCampanha = async (req, res) => {
 try {
  const { idVacina } = req.params;
  const {  } = req.body;
  const result = await pool.query(
    "insert into CAMPANHAVACINA(ID_VACINA) values ($1) RETURNING *",
    [idVacina]
  );

 } catch (error) {
  console.log(error.message);
  return res.json({
    message: "There was an error while adding a vaccine in a campaign"
  });
 }
};

exports.deletarVacinaDeUmaCampanha = async (req, res) => {
  try {
    const { } = req.params;
    await pool.query(
      "delete from  where ",
      []
    );
    return res.json();
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "An error occurred when trying to exclude a vaccine from a campaign",
    });
  }
};

exports.consultaCampanhaPorData = async (req, res) => {
  try {
    const {  } = req.params;
    const result = await pool.query(
      "select * from  where $1",
      []
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message:
        "An error occurred while searching for campaigns by date",
    });
  }
};

exports.consultaCampanhaProtecaoDaVacina = async (req, res) => {
  try {
    const {  } = req.params;
    const result = await pool.query(
      "select * from  where $1",
      []
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message:
        "An error occurred while searching for campaign through the protection of vaccine",
    });
  }
};