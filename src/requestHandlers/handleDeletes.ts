import { Request } from "express";
import { executeQuery } from "../tools/databaseLookup";

/**
 * Handles deleting items in the database so doesn't have to be done in the app.js file.
 * @param req 
 * @returns The status of the request
 */
export const handleDelete = async (req: Request) => {
    let status = 500;
    try{
        if(req.body.id){
            const id = req.body.id;

            const sql = `DELETE FROM PangolinStore WHERE id = ?`;
            const result = await executeQuery(sql, [id]);

            if('affectedRows' in result){
                status = 200;
            }
        }else{
            status = 204;
        }
    }catch(e){
        console.error(e);
    }
    return status;
};