import crypto from 'crypto';

export default class ImageHash {
    static generateImageHash(imageBuffer: Buffer | Uint8Array): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                let cryptoObj = crypto.createHash('sha256');
                cryptoObj.update(imageBuffer);
                const imageHash: string = cryptoObj.digest('hex');
                resolve(imageHash);
            } catch (err) {
                reject(err)
            }
        })
    }
}
