const pool = require("../database/index.js");

exports.consultaVacinaProtecao = async (req, res) => {
  try {
    const { doencaProtecao } = req.params;
    const result = await pool.query(
      "select * from VACINA where DOENCA_PROTECAO ILIKE $1",
      ["%" + doencaProtecao + "%"]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message:
        "There was an error during the search for the vaccine's protection",
    });
  }
};
