import JSZip from "jszip";
import { createUnzip, unzip, unzipSync } from "zlib";

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event) return null;
            if (!event.target) return null;
            
            const arrayBuffer = event.target.result;
            resolve(arrayBuffer as ArrayBuffer);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}

export function unzipOnlyImages(zipFile: File): Promise<File[]> {
    console.log(zipFile)
    return new Promise(async (resolve, reject) => {
        try {
            const zip = JSZip();
            const zipData = await zip.loadAsync(zipFile);

            let extractedFiles: File[] = [];

            for (const [filename, file] of Object.entries(zipData.files)) {
                if (isFileImage(filename) && !filename.startsWith('__MACOSX')) {
                    const content = await file.async('uint8array');
                    const type = getFileType(filename);
                    const fileconent = new File([content], file.name, {type: type});
                    extractedFiles.push(fileconent);
                }
            }
            resolve(extractedFiles)
        } catch (error) {
            reject(error);
        }
    });
}

// checks if its image file
const isFileImage = (filename: string) => {
    const imageFormats = ["jpeg", "png", "bmp", "webp", "tiff"];
    const fileExt = filename.split('.').pop()?.toLowerCase() as string;

    return imageFormats.includes(fileExt);
}

// get file type
const getFileType = (filename: string) => {
    const fileExt = filename.split('.').pop()?.toLowerCase() as string;

    if (fileExt === 'jpeg' || fileExt === 'jpg') return 'image/jpeg';
    if (fileExt === 'png') return 'image/png';
    if (fileExt === 'bmp') return 'image/bmp';
    if (fileExt === 'webp') return 'image/webp';
    return 'image/tiff';
}

// function that generates image url from image buffer
export const generateImageUrlFromBuffer = (imageBuffer: { data: Buffer, type: string }) => {
    const uint = new Uint8Array(imageBuffer.data);
    const blob = new Blob([uint], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}

// get image size from data url
export const getUInt8ArrayFromDataUrl = (dataUrl: string) => {
    const base64Data = dataUrl.split(',')[1];
    const binaryData = atob(base64Data);
    const imageSizeInBytes = binaryData.length;

    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(imageSizeInBytes);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    return uint8Array;
}

export const convertSvgToJpegDataUrl = (svg: SVGSVGElement, imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        const canvas = document.createElement('canvas')
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // convert svg to base 64
        const xml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(xml) // base 64
        const b64Start = 'data:image/svg+xml;base64,'
        const image64 = b64Start + svg64;


        const heightAttribute = svg.getAttribute('height');
        if (heightAttribute !== null) {
            console.log(heightAttribute)
            const svgHeight = parseFloat(heightAttribute);
            if (!isNaN(svgHeight)) {
                canvas.height = svgHeight;
            } else {
                canvas.width = 100;
            }
        }


        const widthAttribute = svg.getAttribute('width');
        if (widthAttribute !== null) {
            console.log(widthAttribute) 
            const svgWidth = parseFloat(widthAttribute);
            if (!isNaN(svgWidth)) {
                canvas.width = svgWidth;
            } else {
                canvas.width = 100;
            }
        }
        

        // image
        const image = new Image();
        image.src = imageUrl;

        console.log(image.height)
        console.log(image.width)

        image.onload = () => {
            console.log(image)

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            image.src = image64;

            image.onload = () => {
                ctx.drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            }
        }

        image.onerror = (error) => {
            reject(error)
        }
    })

}


