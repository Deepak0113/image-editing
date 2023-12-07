export type CustomResponse = {
    message: string,
    statusCode: number
}

export type CustomImageUploadResponse = {
    message: string,
    statusCode: number
    data: {
        imageId: string
    }
}

export type CustomImageGetResponse = {
    message: string,
    statusCode: number
    data: {
        filename: string,
        buffer: Buffer,
        imageId: string
    }[]
}

export type CustomGetTotalCountResponse = {
    message: string,
    statusCode: number
    data: {
        count: number
    }
}

export type CustomDeleteResponse = {
    message: string,
    statusCode: number
    data: {
        imageId: string,
        isDeleted: boolean
    }[]
}

export type ImageData = {
    filename: string,
    buffer: Buffer,
    imageId: string
}