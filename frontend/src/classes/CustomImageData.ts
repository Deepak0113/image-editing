export class CustomImageData {
    private imageHash: string;
    private imageData: Uint8Array;

    constructor (imageHash: string, imageData: Uint8Array){
        this.imageHash = imageHash;
        this.imageData = imageData;
    }

    getImageHash(): string {
        return this.imageHash;
    }

    getImageData(): Uint8Array {
        return this.imageData;
    }
}