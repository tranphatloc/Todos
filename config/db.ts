import postgres from "postgres";

const sql = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    transform: postgres.toCamel
})

export default sql;