const pool = require("./../database/index.js");

exports.consultaAno = async (req, res) => {
  try {
    const { mes } = req.params;
    const result = await pool.query(
      "select * from paciente where id_paciente= $1"
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaAnoFinal = async (req, res) => {
    try {
      const { mesFinal } = req.params;
      const result = await pool.query(
        ""
      );
      return res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  };