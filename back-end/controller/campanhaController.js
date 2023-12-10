const pool = require("../database/index.js");
const queryFormatter = require("node-pg-format");

exports.cadastroCampanhaDeVacinacao = async (req, res) => {
  try {
    const { descricao, dataInicio, dataFim } = req.body;
    const resultId = await pool.query(
      "select max(ID_CAMPANHA) + 1 as nextId from CAMPANHA"
    );

    const nextId = resultId.rows[0]["nextid"];

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
    const { idCampanha } = req.params;

    const updatedValues = Object.values(req.body);
    const updatedColumns = Object.keys(req.body).join(", ");

    const queryString = `update CAMPANHA set(${updatedColumns}) = row(%L) where ID_CAMPANHA = %L RETURNING *`;
    const formattedQuery = queryFormatter.formatWithArray(queryString, [
      updatedValues,
      idCampanha,
    ]);

    const result = await pool.query(formattedQuery);

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "There was an error while editing the vaccination's campaign",
    });
  }
};

exports.cadastroDeVacinaEmUmaCampanha = async (req, res) => {
  try {
    const { idVacina, idCampanha } = req.body;
    const result = await pool.query(
      "insert into CAMPANHAVACINA(ID_VACINA, ID_CAMPANHA) values ($1, $2) RETURNING *",
      [idVacina, idCampanha]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "There was an error while adding a vaccine in a campaign",
    });
  }
};

exports.deletarVacinaDeUmaCampanha = async (req, res) => {
  try {
    const { idCampanha, idVacina } = req.params;
    const result = await pool.query(
      "delete from CAMPANHAVACINA where ID_CAMPANHA = $1 AND ID_VACINA = $2",
      [idCampanha, idVacina]
    );
    return res.json();
  } catch (error) {
    console.error(error.message);
    return res.json({
      message:
        "An error occurred when trying to exclude a vaccine from a campaign",
    });
  }
};

exports.consultaCampanhaPorData = async (req, res) => {
  try {
    const { dataBuscada } = req.body;
    const result = await pool.query(
      "select * from CAMPANHA where DATA_INICIO <= $1 AND DATA_FIM >= $1",
      [dataBuscada]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "An error occurred while searching for campaigns by date",
    });
  }
};

exports.consultaCampanhaProtecaoDaVacina = async (req, res) => {
  try {
    const { doencaProtecao } = req.params;
    const result = await pool.query(
      `select * from CAMPANHAVACINA inner join CAMPANHA 
      on CAMPANHA.ID_CAMPANHA = CAMPANHAVACINA.ID_CAMPANHA 

      inner join VACINA on VACINA.ID_VACINA = CAMPANHAVACINA.ID_VACINA
      where VACINA.DOENCA_PROTECAO ILIKE $1`,
      ["%" + doencaProtecao + "%"]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message:
        "An error occurred while searching for campaign through the protection of vaccine",
    });
  }
};
