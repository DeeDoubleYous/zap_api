import { IPangolinRecord } from "../interfaces";
import { Request } from "express";
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
        const query = `SELECT id, time, imageUrl, isDead, deathType, note, location FROM PangolinStore WHERE id = ?`;
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
export const handleListGet = async (req: Request) => {
    let status = 500, data: IPangolinRecord[] | null = null;
    try{
        if(req.params.order){
            const order = req.params.order;

            const sql = `SELECT id, time, imageUrl, isDead, deathType, note, location FROM PangolinStore ORDER BY ? LIMIT 10`;
            const result = await executeQuery(sql, [order]);

            if(result){
                status = 200;
                data = JSON.parse(JSON.stringify(result));
            }
        }else{
            const sql = `SELECT id, time, imageUrl, isDead, deathType, not, location FROM PangolinStore LIMIT 10`;
            
            const result = await executeQuery(sql, []);

            if(result){
                status = 200;
                data = JSON.parse(JSON.stringify(result));
            }
        }
    }catch(e){
        console.error(e);
    }
    return {status, data};
};