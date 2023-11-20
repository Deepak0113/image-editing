import express, { Request, Response, Express } from "express";
import MongoDBConnector from "./database/MongoDBConnector";
import { getImageFromDB, getTotalImageCountFromDB, uploadImageDB, deleteImageDB } from "./database/database";
import { Db, GridFSBucket } from "mongodb";
import { commonMiddleware } from "./middlewares/common";
import ImageHash from "./helper/ImageHash";

const PORT = 8080;

// express app
const app = express();
let db: Db;
let gridFsBucket: GridFSBucket;

// middlewares
commonMiddleware(app);

// database connection instance
const connector = MongoDBConnector.getInstance();

// api endpoints to check if the server is working or not
app.get('/api/checking', (request, response) => {
    response.send('data value')
});

// api endpoints to upload images
app.post('/api/uploadImage', (request: Request, response: Response) => {
    const dataBuffer: Buffer[] = [];

    request.on('data', (chunk: Buffer) => {
        dataBuffer.push(chunk);
    })

    request.on('end', async () => {
        const buffer = Buffer.concat(dataBuffer);
        const imageHash = await ImageHash.generateImageHash(buffer);

        uploadImageDB(gridFsBucket, buffer, imageHash)
            .then((result) => response.send(result))
            .catch((err) => {
                console.log(err);
                response.send(err);
            });
    })

    request.on('error', (err) => {
        response.send(err);
    })
});

// api endpoint to get images
app.get('/api/images', async (request: Request, response: Response) => {
    // request data
    const pageNo = parseInt(request.headers.pageno as string);
    const limit = parseInt(request.headers.limit as string);
    const skipCount = (pageNo - 1) * limit;

    // get images from database
    const promiseResponse = await getImageFromDB(
        gridFsBucket,
        skipCount,
        limit
    )
        .then((result) => {
            response.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
});

// api endpoint to get total images
app.get('/api/getTotalImages', (request: Request, response: Response) => {
    getTotalImageCountFromDB(gridFsBucket)
        .then((result) => {
            response.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
})

// api endpoint to delete images
app.post('/api/deleteImages', async (request: Request, response: Response) => {
    const imageHashes: string[] = request.body.imageHashs;
    let deletedImages: string[] = []

    await Promise.all(
        imageHashes.map(async (hash) => {
            await deleteImageDB(gridFsBucket, hash);
            deletedImages.push(hash);
        })
    );

    response.send({
        deletedImages,
        message: deletedImages.length === 0 ? 'No images deleted' : 'Images deleted',
        status: 200
    });
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


