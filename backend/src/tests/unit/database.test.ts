import { after, before, describe, it } from "node:test";
import MongoDBConnector from "../../database/MongoDBConnector";
import ImageHash from "../../helper/ImageHash";
import { join } from "node:path";
import { localImageToBuffer } from "../utility/utility";
import { deleteImageDB, getImageFromDB, getTotalImageCountFromDB, uploadImageDB } from "../../database/database";
import { GridFSBucket } from "mongodb";
import assert from "node:assert";

export function databaseFunctionTest() {
    const connector = MongoDBConnector.getInstance();
    let gridFSBucket: GridFSBucket;
    let imageHash: string;
    let imageBuffer: Buffer;



    describe("Database Functions", async () => {
        // this executes before starting testing
        before(async () => {
            await connector.connect();
            gridFSBucket = connector.getGridFSBucket();
            const imagePath = '../test-assets/sample_image1.JPEG';
            const path = join(__dirname, imagePath);

            try {
                imageBuffer = await localImageToBuffer(path);
                imageHash = await ImageHash.generateImageHash(imageBuffer);
            } catch (error) {
                console.error('Error generating image buffer:', error);
                // Handle the error, throw it, or skip the tests if necessary
                throw error;
            }
        });

        // test to upload image to the database
        it("should upload images to the database", async () => {
            const result = await uploadImageDB(gridFSBucket, imageBuffer, imageHash);
            assert.equal(result.status, 200);
        })

        // test to get images from database
        it("should get images from database", async () => {
            const images = await getImageFromDB(gridFSBucket, 0, 10);
            assert.ok(images);
        })

        // test to get total number of images from database
        it("should get total number of images from database", async () => {
            const request = await getTotalImageCountFromDB(gridFSBucket);
            assert.ok(request.message >= 0);
        })

        // test to get delete images from database
        it("should delete images from database", async () => {
            const result = await deleteImageDB(gridFSBucket, imageHash);
            assert.equal(result.status, 200);
        })

        // executes after all testing is done for Database Functions
        after(async () => {
            if (connector)
                await connector.disconnect();
        });
    })
}

