import { IDeathType, IPangolinRecord } from "../interfaces";
import { Request, Response } from "express";
import { executeQuery } from "../tools/databaseLookup";

/**
 * Handles getting a single piece of data from the database so that it doesn't have to be done in the app.js file
 * @param req 
 * @returns The status of the request and the requested data
 */
export const handleIdGet = async (req: Request) => {
    let status = 500, data: IPangolinRecord | null = null;
    try{
        const id = req.query.id;
        const query = `SELECT id, time, imageUrl, isDead, deathName, note, location FROM PangolinStore ps INNER JOIN deathTypes dt ON ps.deathId = dt.deathID WHERE id = ?`;
        const result = await executeQuery(query, [id]);

        if(result){
            status = 200;
            data = JSON.parse(JSON.stringify(result));
        } else{
            status = 204;
        }
    } catch(e){
        console.error(e);
    }

    return {status, data};
};

/**
 * Handles getting a list of items from the database. Can optionally take an order and filter for that.
 * @param req 
 * @returns The status of the request and a list of items from the database
 */
export const handleListGet = async (req: Request, res: Response) => {
    let status = 500, data: IPangolinRecord[] | null = null;
    try{
        if(req.query.limit){
            const limit = req.query.limit;

            const sql = `SELECT id, time, imageUrl, isDead, deathName, note, location FROM PangolinStore ps INNER JOIN DeathTypes dt ON ps.DeathId = dt.DeathId ORDER BY time DESC LIMIT ?`;

            const result = await executeQuery(sql, [limit]) as IPangolinRecord[];

            if(result){
                status=200;
                data = result;
            }
        }else{
            const sql = `SELECT id, time, imageUrl, isDead, deathName, note, location FROM PangolinStore ps INNER JOIN DeathTypes dt ON ps.DeathId = dt.DeathId`;

            const result = await executeQuery(sql, []) as IPangolinRecord[];

            if(result){
                status = 200;
                data = result;
            }
        }
    }catch(e){
        console.error(e);
        res.send(e);
    }
    return {status, data};
};

/***
 * Fetches the data types from the database
 * @returns The status of the request and the requested data
 */
export const handleDeathTypeGet = async (req: Request, res: Response) => {
    let status = 500, data: IDeathType[] | null = null;
    try{
        const sql = 'SELECT deathId, deathName FROM DeathTypes';

        const result = await executeQuery(sql, []);

        if(result){
            status = 200;
            data = result as IDeathType[];
        }
    }catch(e){
        console.error(e);
        res.send(e);
    }
    return {status, data};
}