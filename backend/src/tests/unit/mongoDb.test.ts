import { after, before, describe, it } from "node:test";
import MongoDBConnector from "../../database/MongoDBConnector";
import assert from "node:assert";

export function mongoDBTesting() {
    const connector = MongoDBConnector.getInstance();

    describe("MongoDBConnector", () => {
        // this executes before starting testing
        before(async () => {
            await connector.connect();
        });

        // test to connect to the database
        it('should connect to the database', async () => {
            assert.doesNotThrow(async () => await connector.connect());
        });

        // test to get database instance
        it('should get the database instance', () => {
            assert.doesNotThrow(() => connector.getDatabase());
        });

        // test to get gridfs instance
        it('should get the GridFSBucket instance', () => {
            assert.doesNotThrow(() => connector.getGridFSBucket());
        });

        // test to disconnect from database
        it('should disconnect from the database', async () => {
            assert.doesNotThrow(async () => await connector.disconnect());
        });

        // executes after all testing is done for Database Functions
        after(async () => {
            if(connector)
                await connector.disconnect();
        });
    })

}