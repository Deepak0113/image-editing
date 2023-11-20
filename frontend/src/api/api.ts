const SERVER_URL = 'http://10.15.96.191:8080';

const API_ENDPOINT = {
    'getImagesEndpoint': SERVER_URL + '/api/images',
    'uploadImages': SERVER_URL + '/api/uploadImage',
    'getTotalImageCount': SERVER_URL + '/api/getTotalImages',
    'getDeleteImagesEndpoint': SERVER_URL + '/api/deleteImages'
}

// api function to upload image
export const uploadImage = (file: File) => {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_ENDPOINT.uploadImages, true);

        // Set the content type to indicate you're sending form data
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    console.error('Error occurred during the upload.');
                    reject('some problem');
                }
            }
        };

        xhr.onerror = () => {
            console.error('Error occurred during the upload.');
            reject('some problem');
        };

        xhr.send(file);
    });
};

// api function to get images
export const getImagesAPI = (limit: number, pageno: number): Promise<ImageResponce[]> => {
    return new Promise((resolve, reject) => {
        // XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        xhr.open('GET', API_ENDPOINT.getImagesEndpoint); // open api endpoint
        xhr.setRequestHeader('pageno', `${pageno}`);
        xhr.setRequestHeader('limit', `${limit}`);

        // XMLHttpRequest object onreadystatechange 
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const imagesRequest = JSON.parse(xhr.response);
                resolve(imagesRequest);
            }
        }

        xhr.send(); // send request to the server
    })
}

// api function to get total count of images
export const getTotalImageCount = (): Promise<{ message: number, status: number }> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', API_ENDPOINT.getTotalImageCount);

        // XMLHttpRequest object onreadystatechange 
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const imagesRequest = JSON.parse(xhr.response);
                resolve(imagesRequest);
            }
        }

        xhr.send(); // send request to the server
    })
}

// api function to delete image
export const deleteImagesAPI = (imageHashs: string[]): Promise<{ deletedImages: string[], message: string, status: number }> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_ENDPOINT.getDeleteImagesEndpoint, true);

        // Set the Content-Type header for JSON
        xhr.setRequestHeader("Content-Type", "application/json");

        // XMLHttpRequest object onreadystatechange 
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const imagesRequest = JSON.parse(xhr.response);
                console.log(imagesRequest);
                resolve(imagesRequest);
            }
        }

        xhr.send(JSON.stringify({
            imageHashs
        }));

    })
}
