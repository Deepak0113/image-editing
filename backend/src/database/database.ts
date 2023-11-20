import { Collection, GridFSBucket } from "mongodb"

interface DBSchema {
    _id: string
    fileBytes: Uint8Array,
    thumbnailUrl: string
}

export function uploadImageDB(gridFsBucket: GridFSBucket, imageBuffer: Buffer, imageHash: string): Promise<{ message: string, status: number }> {
    return new Promise(async (resolve, reject) => {
        try {
            const count = (await gridFsBucket.find({ filename: imageHash }).toArray()).length;

            if (count > 0) {
                console.log('already exist');
                resolve({
                    message: 'Already exist',
                    status: 200
                });
                return;
            }

            let uploadStream = gridFsBucket.openUploadStream(imageHash);
            uploadStream.end(imageBuffer);
            uploadStream.once('finish', () => {
                console.log('uploaded')
                resolve({
                    message: `${imageHash}`,
                    status: 200
                })
            });
            uploadStream.on('error', (err) => reject(err));
        } catch (err) {
            reject(err);
        }
    })
}

export function getImageFromDB(gridFSBucket: GridFSBucket, skipCount: number, limit: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const images = await gridFSBucket
                .find({})
                .project({ filename: 1, _id: 0 })
                .sort({ uploadDate: -1 })
                .skip(skipCount)
                .limit(limit)
                .toArray();
            let imageBuffers;

            imageBuffers = await Promise.all(images.map(async (image, index) => {
                return new Promise((resolve, reject) => {
                    const downloadStream = gridFSBucket.openDownloadStreamByName(image.filename);
                    let buffer: Buffer[] = [];

                    downloadStream.on('data', (chunk) => {
                        buffer.push(chunk)
                    });

                    downloadStream.on('end', () => {
                        const imageBuffer = Buffer.concat(buffer);
                        resolve({ imageHash: image.filename, imageBuffer });
                    });

                    downloadStream.on('error', reject);
                });
            }));

            resolve(imageBuffers)
        } catch (err) {
            reject(err);
        }
    })
}

export function getTotalImageCountFromDB(gridFSBucket: GridFSBucket) {
    return new Promise(async (resolve, reject) => {
        try {
            const count = (await gridFSBucket.find({}).toArray()).length
            resolve({
                message: count,
                status: 200
            });
        } catch (err) {
            reject(err);
        }
    })
}

export function deleteImageDB(gridFSBucket: GridFSBucket, imageHash: string): Promise<{ message: string, status: number }> {
    return new Promise(async (resolve, reject) => {
        try {
            const imageData = await gridFSBucket.find({ filename: imageHash }).toArray();


            if (imageData.length === 0) {
                reject({ error: 'Image not available' });
                return;
            }

            await gridFSBucket.delete(imageData[0]._id);
            console.log('Image deleted')
            resolve({
                message: `Deleted image`,
                status: 200
            })
        } catch (err) {
            reject(err);
        }
    })
}
