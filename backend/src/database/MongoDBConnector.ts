import { Db, GridFSBucket, MongoClient, MongoClientOptions } from "mongodb";

class MongoDBConnector {
    private URI = 'mongodb://localhost:27017'; // db uri
    private DB_NAME = 'images-bucket'; // db name
    private static instance: MongoDBConnector; // connector instance
    private client: MongoClient; // mongo client
    private db!: Db; // db
    private gridFSBucket!: GridFSBucket; // GridFSBucket

    // creates mongo client with min pool size of 25
    private constructor() {
        this.client = new MongoClient(this.URI, {
            minPoolSize: 25
        } as MongoClientOptions);
    }

    // get database instance
    public static getInstance(): MongoDBConnector {
        if (!this.instance) {
            this.instance = new MongoDBConnector();
        }

        return this.instance;
    }

    // get database
    public getDatabase(): Db {
        if (!this.db) {
            throw new Error('Database not connected');
        }
        return this.db;
    }

    // get grid-fs bucket
    public getGridFSBucket(): GridFSBucket {
        if(!this.gridFSBucket) {
            throw new Error('Grid FS bucket not connected');
        }
        return this.gridFSBucket;
    }
    
    // connect database
    public async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(this.DB_NAME);
            this.gridFSBucket = new GridFSBucket(this.db);

            console.log('Connected to MongoDB');
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong while connection database.');
        }
    }
    
    // disconnect database
    public async disconnect(): Promise<void> {
        await this.client.close();
        console.log('Disconnected from MongoDB');
    }
}

export default MongoDBConnector;