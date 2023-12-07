function isImageValid(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                // Create an Image element
                const img = new Image();

                img.onload = () => {
                    // Retrieve the width and height of the image
                    const width = img.width;
                    const height = img.height;

                    // Check if dimensions are valid
                    if (width > 0 && height > 0) {
                        // Check the reported content type
                        const reportedType = file.type;
                        const isValidType = reportedType.startsWith('image/');

                        if (isValidType) {
                            console.log('Image is valid.');
                            resolve(true);
                        } else {
                            console.log('Reported content type is not valid.');
                            resolve(false);
                        }
                    } else {
                        console.log('Image dimensions are invalid.');
                        resolve(false);
                    }
                };

                img.onerror = (err) => {
                    resolve(false)
                }

                // Set the source of the image to the data URL obtained from FileReader
                img.src = event.target?.result as string;
            } catch (error) {
                console.error('Error processing file:', error);
                reject(error);
            }
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
}

export default isImageValid;