

export default class ImageList {
    private imageList: ImageListItem[];

    constructor() {
        this.imageList = [];
    }

    // add image
    add(imageId: string, imageFile: { data: Buffer, type: string }, imageUrl: string) {
        this.imageList = [
            { imageId, imageBuffer: imageFile, imageUrl },
            ...this.imageList
        ];
    }

    // remove image
    remove(imageId: string) {
        this.imageList = this.imageList.filter((imageListItem) => {
            return imageListItem.imageId !== imageId;
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

