interface ImageResponce {
    imageHash: string,
    imageBuffer: {data: Buffer, type: string}
}

type ImageListItem = {
    imageHash: string
    imageBuffer?: { data: Buffer, type: string }
    imageUrl: string
}

type BoardElementAttribute = {
    fill: string,
    lineType: 'line' | 'dash',
    lineWidth: number,
    lineColor: string
}

type BoardEditMode = 'pen' | 'shapes' | 'eraser';