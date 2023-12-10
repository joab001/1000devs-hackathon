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

exports.consultaVacina = async (req, res) => {
  try {
    // const { id } = req.params;
    const result = await pool.query(
      `select * from vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultarAno = async (req, res) => {
  try {
    const { ano } = req.params;
    const result = await pool.query(
      `select * from VACINA as V 
      left join periodoaplicacaomes pam on v.id_vacina = pam.id_vacina
      left join periodoaplicacaoano pa on v.id_vacina = pa.id_vacina
      where pa.qtd_ano_inicial  = ${ano} 
      order by vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaIntervaloAnual = async (req, res) => {
  try {
    const { inicio, fim } = req.params;
    const result = await pool.query(
      `select * from VACINA as V 
      left join periodoaplicacaomes pam on v.id_vacina = pam.id_vacina
      left join periodoaplicacaoano pa on v.id_vacina = pa.id_vacina
      where pa.qtd_ano_inicial  >=${inicio}
        and pa.qtd_ano_inicial  <=${fim} 
      order by vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaMensal = async (req, res) => {
  try {
    const { mes } = req.params;
    const result = await pool.query(
      `select * from VACINA as V 
      left join periodoaplicacaomes pam on v.id_vacina = pam.id_vacina
      left join periodoaplicacaoano pa on v.id_vacina = pa.id_vacina
      where pa.qtd_ano_inicial  = ${mes}
      order by vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaIntervaloMensal = async (req, res) => {
  try {
    const { inicio, fim } = req.params;
    const result = await pool.query(
      `select * from VACINA as V 
      left join periodoaplicacaomes pam on v.id_vacina = pam.id_vacina
      left join periodoaplicacaoano pa on v.id_vacina = pa.id_vacina
      where pam.qtd_meses_inicial  >=${inicio}
        and pam.qtd_meses_final  <=${fim}  
      order by vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};
exports.consultarPorTexro = async (req, res) => {
  try {
    const { inicio, fim } = req.params;
    const result = await pool.query(
      `select * from VACINA as V 
      left join periodoaplicacaomes pam on v.id_vacina = pam.id_vacina
      left join periodoaplicacaoano pa on v.id_vacina = pa.id_vacina
      where pam.qtd_meses_inicial  >=${inicio}
        and pam.qtd_meses_final  <=${fim}  
      order by vacina`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
};

