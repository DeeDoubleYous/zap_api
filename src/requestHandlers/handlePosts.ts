import { Request, Response } from "express";
import { executeQuery } from "../tools/databaseLookup";

/**
 * Handles creating the data on the database so that it doesn't have to be done in the app.js file.
 * @param req 
 * @returns The status of the request and id of the inserted item.
 */
export const handlePost = async (req: Request, res: Response) => {
    let status = 500, data: {id: number} | null = null;
    try{
        if(req.body.time && req.file && req.body.isDead && req.body.location){
            const imageUrl = `${req.file.destination}/${req.file.filename}`, time = req.body.time, isDead = req.body.isDead == 'true' ? 1 : 0, location = req.body.location;
            
            let deathId = null, note = null; 
            if(req.body.deathId) deathId = req.body.deathId;
            if(req.body.note) note = req.body.note;

            const sql = `INSERT INTO PangolinStore (time, imageUrl, isDead, location${deathId ? ', deathID':''} ${note ? ', note':''}) VALUES(?, ?, ?, ? ${deathId ? ', ?':''} ${note ? ', ?':''})`;

            let params = [time, imageUrl, isDead, location];

            deathId && params.push(deathId);
            note && params.push(note);

            const result = await executeQuery(sql, params)
            
            if('affectedRows' in result){
                status = 201;
                data = {id:result.insertId};
            }

        } else{
            status = 204;
        }
    }catch(e){
        console.error(e);
        res.status(500);
        res.send(e);
    }
    return {status, data}
};

/**
 * Handles updating the data in the server so that this doesn't have to be done in the app.js file.
 * @param req 
 * @returns The status of the request and the id of the affected data
 */
export const handleUpdates = async (req: Request) => {
    let status = 500, data = null;

    try{
        if(req.body.id && req.body.time && req.file && req.body.isDead && req.body.location){
            const id = req.body.id, imageUrl = req.file.destination, time = req.body.time, isDead = req.body.isDead == 'true' ? 1 : 0, location = req.body.location;

            let deathType = null, note = null;

            if(req.body.deathType){
                deathType = req.body.deathType;
            }

            if(req.body.note){
                note = req.body.note;
            }

            const sql = `UPDATE PangolinStore SET time = ?, imageUrl= ?, isDead = ?, location = ?${deathType?', deathType = ?':''}${note?', note = ?':''} WHERE id = ?`;

            let params = [time, imageUrl, isDead, location];

            deathType&&params.push(deathType);
            note&&params.push(note);

            params.push(id);

            const result = await executeQuery(sql, params);

            if('affectedRows' in result){
                status = 201;
                data={id:id};
            }

        }else{
            status = 204;
        }
    }catch(e){
        console.error(e);
    }

    return {status, data};
};