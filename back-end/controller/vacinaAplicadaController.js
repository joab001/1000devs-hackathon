const pool = require("./../database/index.js");

exports.consultaVacinaPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const result = await pool.query(
      "select * from VACINAAPLICADA where ID_PACIENTE = $1",
      [idPaciente]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "There was an error during the search for the pacient's vaccines",
    });
  }
};

exports.cadastroVacinaPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const { idVacina, dataAplicacao } = req.body;
    const result = await pool.query(
      "insert into VACINAAPLICADA(ID_PACIENTE, ID_VACINA, DATA_APLICACAO) values ($1, $2, $3) RETURNING *",
      [idPaciente, idVacina, dataAplicacao]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "There was an error while adding the pacient's vaccine",
    });
  }
};

exports.excluirVacinaPaciente = async (req, res) => {
  try {
    const { idPaciente, idVacina } = req.params;
    await pool.query(
      "delete from VACINAAPLICADA where ID_PACIENTE = $1 AND ID_VACINA = $2",
      [idPaciente, idVacina]
    );
    return res.json();
  } catch (error) {
    console.error(error.message);
    return res.json({
      message: "There was an error while trying to delete the pacient's vaccine",
    });
  }
};
