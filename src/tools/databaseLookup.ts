import mysql from 'mysql2/promise';
import { ICredentials } from '../interfaces';
import { readFileSync } from 'fs';

const databaseLookUp = ():ICredentials => {
    return JSON.parse(readFileSync('./credentials.json', 'utf-8')) as ICredentials;
};

let credentials: ICredentials = databaseLookUp();


export const executeQuery = async (sql: string, params: any[]) => {
    const connection = await mysql.createConnection(credentials);
    const [results] = await connection.execute(sql, params);
    return results;
};