import express from 'express';
import upload from 'express-fileupload';

import { handleIdGet, handleListGet } from './requestHandlers/handleGets.js';
import { handlePost, handleUpdates } from './requestHandlers/handlePosts.js';
import { handleDelete } from './requestHandlers/handleDeletes.js';

const app = express();

const port = 8080;

//Defining the tools that should be used to understand the information provided
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(upload({createParentPath: true}));

//Defining the routing and the requests 
app.get('/zap_api', async (req, res) => {
    if(req.query.id){
        const {status, data} = await handleIdGet(req);
        res.status(status);
        if(data) res.json(data);
        else res.end();
    }else{
        // res.status(400);
        // res.end();
        res.send(`this isn't what I wanted`);
    }
});

app.get('/zap_api/list', async (req, res) => {
    const {status, data} = await handleListGet(req);
    res.status(status);
    if(data) res.json(data);
    else res.end();
});

app.get('/zap_api/public/images/:date/:file', async (req, res) => {
    try{
        res.sendFile(`${__dirname}/public/images/${req.params.date}/${req.params.file}`);
        res.status(200);
    }catch(e){
        console.error(e);
    }
})

app.post('/zap_api', async (req, res) => {
    const {status, data} = await handlePost(req);
    res.status(status);
    if(data) res.json(data);
    else res.end();
});

app.post('/zap_api/update', async (req, res) => {
    const {status, data} = await handleUpdates(req);
    res.status(status);
    if(data) res.json(data);
    else res.end();
})

app.delete('/zap_api', async (req, res) => {
    const status = await handleDelete(req);
    res.status(status);
    res.end();
});

app.put('/zap_api', (req, res) => {
    res.send('I am the one and only');
});

//Starting up
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});