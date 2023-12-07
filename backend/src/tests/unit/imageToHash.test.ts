import assert from "node:assert";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { localImageToBuffer } from "../utility/utility";
import ImageHash from "../../helper/ImageHash";

export function imageToHashTesting() {
    const imagePath = '../test-assets/sample_image1.JPEG';

    describe("convert image to hash", () => {
        // test to get hash from image
        it("converts image to hash", async () => {
            const path = join(__dirname, imagePath);

            if (!existsSync(path)) { assert.equal('asd', 'ad'); }

            const imageBuffer = await localImageToBuffer(path);
            const hash = await ImageHash.generateImageHash(imageBuffer);
            assert.equal(typeof (hash).toString(), 'string');
        })
    })

}