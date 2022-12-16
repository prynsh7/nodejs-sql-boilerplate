module.exports = {
    HOST: process.env.RDS_HOSTNAME,
    PORT: process.env.RDS_PORT,
    DEFAULT_DB: process.env.RDS_DB_NAME,
    COMMUNITY_DB: process.env.RDS_COMMUNITY_DB,
    USER: process.env.RDS_USERNAME,
    PASS: process.env.RDS_PASSWORD,
    DIALECT: "mysql",
    pool: {
        max: 8,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
