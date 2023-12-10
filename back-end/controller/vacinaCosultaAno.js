const pool = require('./../database/index.js');

exports.consultaAno = async (req, res) => {
  try {
    const { ano } = req.params;
    const result = await pool.query(
      `select *  from VACINA as V 
      inner join periodoaplicacaoano PA on V.id_vacina = pa.id_vacina 
      left join  periodoaplicacaomes PAM on v.id_vacina  = pam.id_vacina
      left join  rede r  on v.id_rede = r.id_rede
      where pa.qtd_ano_inicial  >= ${ano} 
      and pa.qtd_ano_inicial <= ${ano}`
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

exports.consultaAnoFinal = async (req, res) => {
  try {
    const { anoFinal } = req.params;
    const result = await pool.query(
      `select *  from VACINA as V 
      inner join periodoaplicacaoano PA on V.id_vacina = pa.id_vacina 
      left join  periodoaplicacaomes PAM on v.id_vacina  = pam.id_vacina
      left join  rede r  on v.id_rede = r.id_rede
      where pa.qtd_ano_inicial  >= ${anoFinal} 
      and pa.qtd_ano_inicial <= ${anoFinal}`
    );
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};
