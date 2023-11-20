

export default class ImageList {
    private imageList: ImageListItem[];

    constructor() {
        this.imageList = [];
    }

    // add image
    add(imageHash: string, imageFile: { data: Buffer, type: string }, imageUrl: string) {
        this.imageList = [
            { imageHash, imageBuffer: imageFile, imageUrl },
            ...this.imageList
        ];
    }

    // remove image
    remove(imageHash: string) {
        this.imageList = this.imageList.filter((imageListItem) => {
            return imageListItem.imageHash !== imageHash;
        });
    }

    // get image
    get(): ImageListItem[] {
        return this.imageList;
    }

    size(): number {
        return this.imageList.length;
    }
}

