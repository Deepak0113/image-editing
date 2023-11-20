import bodyParser from 'body-parser';
import cors from 'cors';
import { Express } from 'express'

export function commonMiddleware(app: Express) {
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'application/octet-stream' }));
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', 'http://10.15.96.196:3000'); // Replace with the origin of your web page
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(cors());
}