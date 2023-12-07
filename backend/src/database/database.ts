import { Collection, GridFSBucket, ObjectId } from "mongodb"
import { console_success } from "../helper/chalk";
import { CustomGetTotalCountResponse, CustomImageGetResponse, CustomImageUploadResponse, CustomResponse, ImageData } from "../types";
// import { PromiseDeleteResponse, PromiseGetCountResponse, PromiseGetImageResponse, PromiseResponse, PromiseUploadResponse } from "../types";

interface DBSchema {
    _id: string
    fileBytes: Uint8Array,
    thumbnailUrl: string
}

// function to upload image in database
export function uploadImageDB(
    gridFsBucket: GridFSBucket,
    imageBuffer: Buffer,
    filename: string): Promise<CustomImageUploadResponse> {
    return new Promise((resolve, reject) => {
        try {
            // Upload image to GridFS
            let uploadStream = gridFsBucket.openUploadStream(filename);
            uploadStream.end(imageBuffer);

            uploadStream.once('finish', () => {
                const uploadedImageId = uploadStream.id;

                // Send resolve after uploading
                resolve({
                    message: 'Image uploaded',
                    statusCode: 200,
                    data: {
                        imageId: uploadedImageId.toString()
                    }
                } as CustomImageUploadResponse)
            });

            uploadStream.on('error', (err) => {
                if (err.name === 'MongoError' && err.message.includes('duplicate key error')) {
                    // Duplicate key error
                    reject({
                        message: 'Image with the same hash already exists.',
                        statusCode: 400  // Bad Request
                    });
                } else if (err.name === 'GridFSBucketError') {
                    // GridFSBucketError
                    reject({
                        message: 'Error in GridFSBucket.',
                        statusCode: 500  // Internal Server Error
                    });
                } else {
                    // Other errors
                    reject({
                        message: 'Error uploading image.',
                        statusCode: 500  // Internal Server Error
                    });
                }
            });
        } catch (err) {
            // send reject for general error
            reject({
                message: 'Error uploading image.',
                statusCode: 500  // Internal Server Error
            });
        }
    })
}

export async function getImageFromDB(
    gridFSBucket: GridFSBucket,
    skipCount: number,
    limit: number): Promise<CustomImageGetResponse> {
    try {
        const images = await gridFSBucket
            .find({})
            .project({ filename: 1 })
            .sort({ uploadDate: -1 })
            .skip(skipCount)
            .limit(limit)
            .toArray();

        let imageData: ImageData[] = [];

        imageData = await Promise.all(images.map(async (image) => {
            // try {
            const imageBuffer = await downloadStreamGridFS(image.filename, gridFSBucket);

            return {
                imageId: image._id.toString(),
                filename: image.filename,
                buffer: imageBuffer
            }
            // } catch (error) {}
        }));

        return {
            message: 'Got images',
            statusCode: 200,
            data: imageData
        }
    } catch (err) {
        throw {
            message: 'Error retrieving images',
            statusCode: 500
        };
    }
}

// function to get total number of iamges from database
export async function getTotalImageCountFromDB(
    gridFSBucket: GridFSBucket): Promise<CustomGetTotalCountResponse> {
    try {
        const imagesCount = (await gridFSBucket.find({}).toArray()).length;
        return {
            message: 'got image count',
            statusCode: 200,
            data: {
                count: imagesCount
            }
        };
    } catch (error: any) {
        if (error.name) {
            throw {
                message: 'Error accessing the database',
                statusCode: 500 // Internal Server Error
            }
        } else {
            throw {
                message: 'Error getting total image count',
                statusCode: 500 // Internal Server Error
            }
        }
    }
}

export async function deleteImageDB(
    gridFSBucket: GridFSBucket,
    imageId: string): Promise<CustomResponse | { imageId: string }> {
    try {
        const objectId = new ObjectId(imageId);

        // Check if the document exists
        const existingDocument = await gridFSBucket
            .find({ _id: objectId })
            .limit(1)
            .toArray();

        if (existingDocument.length === 0) {
            throw {
                message: 'Image not found',
                statusCode: 400,
                imageId: imageId
            };
        }

        // If the document exists, perform the delete operation
        await gridFSBucket.delete(objectId);

        return {
            message: 'Image deleted',
            statusCode: 200,
            imageId: imageId
        }
    } catch (error: any) {
        if (error.name === 'TypeError') {
            throw {
                message: 'Invalid ObjectId',
                statusCode: 400,
                imageId: imageId
            }
        } else {
            throw {
                message: 'Something went wrong!',
                statusCode: 500,
                imageId: imageId
            }
        }
    }
}

function downloadStreamGridFS(filename: string, gridFSBucket: GridFSBucket): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const downloadStream = gridFSBucket.openDownloadStreamByName(filename);
        let imageBuffer: Buffer[] = [];

        downloadStream.on('data', (chunk) => {
            imageBuffer.push(chunk)
        });

        downloadStream.on('end', () => {
            const imageData = Buffer.concat(imageBuffer);
            resolve(imageData);
        });

        downloadStream.on('error', (error) => {
            if (error.name === 'FileNotFound') {
                reject({ message: 'File not found', statusCode: 404 });
            } else {
                // Handle other download errors
                reject({ message: 'Error downloading file', statusCode: 500 });
            }
        })
    })
}

