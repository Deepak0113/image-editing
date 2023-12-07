import { Request, Response } from "express";
import { deleteImageDB, getImageFromDB, getTotalImageCountFromDB, uploadImageDB } from "../database/database";
import { GridFSBucket } from "mongodb";
import { imageValidity } from "../helper/Validation";
import { generateResponse } from "../helper/ResponceGenerator";
import { CustomGetTotalCountResponse, CustomImageUploadResponse, CustomResponse } from "../types";
import ImageHash from "../helper/ImageHash";


// upload image to database end point
export function uploadImageEndPt(request: Request, response: Response, gridFSBucket: GridFSBucket) {
    const dataBuffer: Buffer[] = [];

    // when data is streaming in chunks
    request.on('data', (chunk: Buffer) => dataBuffer.push(chunk));

    // after data is streamed
    request.on('end', async () => {
        // const checkhash = request.headers.imagehash as string;
        const size = parseInt(request.headers.size as string);

        // get image buffer
        const buffer: Buffer = Buffer.concat(dataBuffer);
        // const hash = await ImageHash.generateImageHash(buffer);

        if(size !== buffer.length) {
            generateResponse(
                'error',
                400,
                'bad request'
            )
        }

        // console.log({
        //     hashcheck1: await ImageHash.generateImageHash(buffer),
        //     hashcheck2: await ImageHash.generateImageHash(new Uint8Array(buffer)),
        //     hashcheck3__checking: checkhash
        // });

        // check if image is valid or not
        // if (!imageValidity(buffer)) {
        //     response.send(
        //         // error response for invalid image
        //         generateResponse(
        //             'error',
        //             400,
        //             'The request image is invalid or corrupted.'
        //         )
        //     );
        //     return;
        // }

        // get filename from headers
        const filename = request.headers.filename as string;

        // upload image from database
        uploadImageDB(gridFSBucket, buffer, filename)
            .then((result: CustomImageUploadResponse) => {
                const responseContent = generateResponse(
                    'success',
                    result.statusCode,
                    result.message,
                    result.data
                );

                response.send(responseContent);
            })
            .catch((err: CustomResponse) => response.send(
                // error response
                generateResponse(
                    'error',
                    err.statusCode,
                    err.message
                )
            ));
    })

}

// get image from database end point
export function getImageEndPt(request: Request, response: Response, gridFSBucket: GridFSBucket) {
    // Request data
    const pageNo = parseInt(request.headers.pageno as string);
    const limit = parseInt(request.headers.limit as string);
    const skipCount = (pageNo - 1) * limit;

    getImageFromDB(gridFSBucket, skipCount, limit)
        .then((result) => {
            response.send(
                generateResponse(
                    'success',
                    result.statusCode,
                    result.message,
                    result.data
                )
            )
        })
        .catch((err: any) => {
            response.send(
                generateResponse(
                    'error',
                    err.statusCode,
                    err.message
                )
            )
        })
}

// get total number of images in database end point
export async function getTotalImagesCountEndPt(request: Request, response: Response, gridFSBucket: GridFSBucket) {
    try {
        const result: CustomGetTotalCountResponse = await getTotalImageCountFromDB(gridFSBucket);
        response.send(
            generateResponse(
                'success',
                result.statusCode,
                result.message,
                result.data
            )
        )
    } catch (err: any) {
        response.send(
            generateResponse(
                'error',
                err.message,
                err.statusCode
            )
        )
    }
}

// delete images from database end point
export async function deleteImagesEndPt(request: Request, response: Response, gridFSBucket: GridFSBucket) {
    const imageIds: string[] = request.body.imageIds;
    let deletedImages: { imageId: string, isDeleted: boolean }[] = []

    await Promise.all(
        [imageIds[0]].map(async (imageId) => {
            try {
                const res = await deleteImageDB(gridFSBucket, imageId);
                console.log(res);
                deletedImages.push({
                    imageId: imageId,
                    isDeleted: true
                });
            } catch (error) {
                deletedImages.push({
                    imageId: imageId,
                    isDeleted: false
                });
            }
        })
    );

    response.send({
        data: deletedImages,
        message: deletedImages.length === 0 ? 'No images deleted' : 'Images deleted',
        status: 200
    });
}

