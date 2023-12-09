const pool = require("./../database/index.js");

exports.consultaPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "select * from paciente where id_paciente= $1",
      [id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.cadastroPaciente = async (req, res) => {
  try {
    const { nome, data_nascimento } = req.body;
    const resultId = await pool.query(
      "select max(id_paciente) +1 as id from paciente"
    );
    const id = resultId.rows[0]["id"];
    const result = await pool.query(
      "insert into paciente (id_paciente,nome, data_nascimento) values ($1,$2, $3) returning *",
      [id, nome, data_nascimento]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.atualizaPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, data_nascimento } = req.body;
    const result = await pool.query(
      "UPDATE paciente SET nome = $1, data_nascimento = $2 WHERE id_paciente= $3",
      [nome, data_nascimento, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
      console.error(error.message)
  }
};
