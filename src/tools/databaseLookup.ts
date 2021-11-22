import mysql from 'mysql2/promise';

const credentials = {
    host: 'dw470.brighton.domains',
    user: 'dw470_database',
    password: 'YF}C{aL!P4*B',
    database: 'dw470_ci609_zap'
};

export const executeQuery = async (sql: string, params: any[]) => {
    const connection = await mysql.createConnection(credentials);
    const [results] = await connection.execute(sql, params);
    return results;
};