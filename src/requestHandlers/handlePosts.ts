import { Request, Response } from "express";
import { executeQuery } from "../tools/databaseLookup";

/**
 * Handles creating the data on the database so that it doesn't have to be done in the app.js file.
 * @param req 
 * @returns The status of the request and id of the inserted item.
 */
export const handlePost = async (req: Request) => {
    let status = 500, data: {id: number} | null = null;
    try{
        if(req.body.time && req.file && req.body.isDead && req.body.location){
            const imageUrl = req.file.path, time = req.body.time, isDead = req.body.isDead == 'true' ? 1 : 0, location = req.body.location;
            
            let deathType = null, note = null; 
            if(req.body.deathType) deathType = req.body.deathType;
            if(req.body.note) note = req.body.note;

            const sql = `INSERT INTO PangolinStore (time, imageUrl, isDead, location${deathType ? ', deathType':''} ${note ? ', note':''}) VALUES(?, ?, ?, ? ${deathType ? ', ?':''} ${note ? ', ?':''})`;
            
            let params = [time, imageUrl, isDead, location];

            deathType && params.push(deathType);
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
    }
    return {status, data}
};

/**
 * Handles updating the data in the server so that this doesn't have to be done in the app.js file.
 * @param req 
 * @returns The status of the request and the id of the affected data
 */
// export const handleUpdates = async (req: Request) => {
//     let status = 500, data = null;

//     try{
//         if(req.body.id && req.body.time && req.files?.pangolinImage && req.body.originalUrl && req.body.isDead && req.body.location){
//             const id = req.body.id, time = req.body.time, isDead = req.body.isDead, location = req.body.location;

//             let deathType = null, note = null;

//             if(req.body.deathType){
//                 deathType = req.body.deathType;
//             }

//             if(req.body.note){
//                 note = req.body.note;
//             }

//             const sql = `UPDATE PangolinStore SET time = ?, isDead = ?, location = ?${deathType?', deathType = ?':''}${note?', note = ?':''} WHERE id = ?`;

//             let params = [time,  isDead, location];

//             deathType&&params.push(deathType);
//             note&&params.push(note);

//             params.push(id);

//             const result = await executeQuery(sql, params);

//             if('affectedRows' in result){
//                 status = 201;
//                 data={id:id}
//             }

//             await updateImage(req.files.updatedImage, req.body.originalUrl);

//         }else{
//             status = 204;
//         }
//     }catch(e){
//         console.error(e);
//     }

//     return {status, data};
// };