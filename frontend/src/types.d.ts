type ImageResponce = {
    imageId?: string,
    filename?: string,
    buffer?: { data: Buffer, type: string }
}

type ImageListItem = {
    imageId?: string,
    imageBuffer?: { data: Buffer, type: string }
    imageUrl: string
    filename?: string,
}

type BoardElementAttribute = {
    fill: string,
    lineType: 'line' | 'dash',
    lineWidth: number,
    lineColor: string
}

type IncomingResponce = {
    message: string,
    data?: {
        count?: number,
        imageData?: ImageResponce[]
    },
    statusCode: number
}

type BoardEditMode = 'pen' | 'shapes' | 'eraser';



type IncomingUploadResponse = {
    message: string,
    statusCode: number
    data: {
        imageId: string
    }
}

type IncomingDeleteResponse = {
    message: string,
    statusCode: number
    data: {
        imageId: string,
        isDeleted: boolean
    }[]
}

type IncomingTotalCountResponse = {
    message: string,
    statusCode: number
    data: {
        count: number
    }
}

type IncomingGetImageResponse = {
    message: string,
    statusCode: number
    data: {
        filename: string,
        buffer: { data: Buffer, type: string },
        imageId: string
    }[]
}

