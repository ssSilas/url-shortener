export default () => ({
  portApp: process.env.PORT_APLICATION || 3000,
  urlApp: process.env.URL_APLICATION,
  secretKey: process.env.SECRET_KEY,
  durationToken: process.env.DURATION_TOKEN,
  salt: process.env.PASS_SALT,
  database: {
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    pass: process.env.DATA_BASE_PASSWORD,
    port: parseInt(process.env.PORT, 10),
    dbName: process.env.DATA_BASE_MANAGER,
    dialect: process.env.DATA_BASE_DIALECT,
  },
});
