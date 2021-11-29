import express from 'express';
import multer from 'multer';

import { handleIdGet, handleListGet } from './requestHandlers/handleGets';
import { handlePost, handleUpdates } from './requestHandlers/handlePosts';
import { handleDelete} from './requestHandlers/handleDeletes';
import { makeProperName } from './tools/imageUtils';

const app = express();

const port = 8080;

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/images`);
    },
    filename: (req, file, cb) => {
        cb(null, `${makeProperName(file.originalname)}`);
    }
});

const upload = multer({storage: fileStorageEngine});

//Defining the tools that should be used to understand the information provided
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Defining the routing and the requests 
app.get('/zap_api', async (req, res) => {
    if(req.query.id){
        const {status, data} = await handleIdGet(req);
        res.status(status);
        if(data) res.json(data);
        else res.end();
    }else{
        res.status(400);
        res.end();
    }
});

app.get('/zap_api/list', async (req, res) => {
    const {status, data} = await handleListGet(req, res);
    res.status(status);
    if(data) res.json(data);
    else res.end();
});

app.get('/zap_api/public/images/:file', async (req, res) => {
    console.log(__dirname);
    try{
        res.sendFile(`${__dirname}/public/images/${req.params.file}`);
        res.status(200);
    }catch(e){
        res.status(500);
        res.send(e);
        console.error(e);
    }
})

app.post('/zap_api', upload.single('pangolinImage'), async (req, res) => {
    const {status, data} = await handlePost(req, res);
    res.status(status);
    if(data) res.json(data);
    else res.end();
});

app.post('/zap_api/update', upload.single('updatedImage'), async (req, res) => {
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
    res.status(404);
    res.end();
});

//Starting up
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});