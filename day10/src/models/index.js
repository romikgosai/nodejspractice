import { Sequelize } from "sequelize";
import "dotenv/config";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
    dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

export default sequelize;