const pool = require("./../database/index.js");

exports.consultaVacinaPaciente = async (req, res) => {
  try {
    const {id_vacina, id_paciente } = req.params;
    const result = await pool.query(
      ""
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaVacinaPendente = async (req, res) => {
  try {
    const { id_vacina, id_paciente  } = req.params;
    const result = await pool.query(
      ""
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};