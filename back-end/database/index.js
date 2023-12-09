const { Pool } = require("pg");

const pool = new Pool({
  user: "maria",
  host: "itcpostgresql.postgres.database.azure.com",
  database: "db012",
  password: "%&unsas_aew27012",
  port: 5432,
  ssl: true,
});

module.exports = pool;