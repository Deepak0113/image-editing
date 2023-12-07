import express, { Request, Response, Express } from "express";
import MongoDBConnector from "./database/MongoDBConnector";
import { getImageFromDB, getTotalImageCountFromDB, uploadImageDB, deleteImageDB } from "./database/database";
import { Db, GridFSBucket } from "mongodb";
import { commonMiddleware } from "./middlewares/common";
import ImageHash from "./helper/ImageHash";
import { generateResponse } from "./helper/ResponceGenerator";
import { imageValidity } from "./helper/Validation";
import { deleteImagesEndPt, getImageEndPt, getTotalImagesCountEndPt, uploadImageEndPt } from "./api-endpoints/endpoints";

const PORT = 8080;

// express app
const app = express();
let db: Db;
let gridFsBucket: GridFSBucket;

// middlewares
commonMiddleware(app);

// database connection instance
const connector = MongoDBConnector.getInstance();

// api endpoints to upload images
app.post('/api/uploadImage', (request: Request, response: Response) => {
    console.log("working")
    uploadImageEndPt(request, response, gridFsBucket)
});

// api endpoint to get images
app.get('/api/images', async (request: Request, response: Response) => {
    getImageEndPt(request, response, gridFsBucket);
});

// api endpoint to get total images
app.get('/api/getTotalImages', async (request: Request, response: Response) => {
    await getTotalImagesCountEndPt(request, response, gridFsBucket);
})

// api endpoint to delete images
app.post('/api/deleteImages', async (request: Request, response: Response) => {
    await deleteImagesEndPt(request, response, gridFsBucket);
})

// server listener
connector.connect()
    .then(() => {
        db = connector.getDatabase();
        gridFsBucket = connector.getGridFSBucket();

        app.listen(PORT, () => {
            console.log(`server started in port ${PORT}`);
        });
    });


