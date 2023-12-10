const pool = require("./../database/index.js");

exports.consultaAno = async (req, res) => {
  try {
    const { Ano } = req.params;
    const result = await pool.query(
      ""
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaAnoFinal = async (req, res) => {
    try {
      const { AnoFinal } = req.params;
      const result = await pool.query(
        ""
      );
      return res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  };