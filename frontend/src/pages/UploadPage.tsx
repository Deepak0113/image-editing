import { ChangeEvent, FC, useEffect, useState } from "react";
import { uploadImage } from "../api/api";
import usePopupNotification from "../hooks/usePopupNotificationHook/usePopupNotification";

import '../styles/UploadPage.css';
import { fileToArrayBuffer, generateImageUrlFromBuffer, unzipOnlyImages } from "../utility/helper";
import isImageValid from "../utility/validation";

interface UploadPageProps {
    handleImage: (imageItem: ImageListItem[]) => void;
    images: ImageListItem[]
}

const UploadPage: FC<UploadPageProps> = ({ handleImage, images }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const { openPopupNotification, notification } = usePopupNotification();
    // const [selectedImageHash, setSelectedImageHash] = useState<Set<string>>(new Set());

    // handles select images
    const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event) return;
        if (!event.target) return;

        const imageFiles = event.target.files;
        if (!imageFiles) return;

        [...imageFiles].map(async (file) => {
            if (file.type === 'application/zip') {
                const unzippedImageFiles: File[] = (await unzipOnlyImages(file)).filter(file => isImageValid(file));
                setSelectedImages((prev) => [...prev, ...unzippedImageFiles]);
            } else {
                if (await isImageValid(file)) {
                    setSelectedImages((prev) => [...prev, file]);
                }
            }
        })
    }

    // upload images
    const handleUploadImages = () => {
        if (selectedImages.length === 0) return;

        selectedImages.forEach(async (file: File) => {
            const result = (await uploadImage(file));

            if (!result.data) return;
            if (!result.data.imageId) return;

            const imageItem: ImageListItem = {
                imageId: result.data.imageId,
                imageUrl: URL.createObjectURL(file)
            }
            handleImage([imageItem, ...images])

            // uploadImage(file);
        })

        setSelectedImages([]);
        openPopupNotification('Images uploaded');
    }

    return <div className="uploadpage">
        {notification}

        {/* Upload Page Top Nav */}
        <div className="uploadpage__topnav">
            {
                selectedImages.length === 0 ?
                    <>
                        <input
                            className="hide"
                            type="file"
                            multiple={true}
                            id="input-btn"
                            onChange={handleSelectImages}
                            accept="image/*, application/zip" />
                        <label className="btn btn-primary" htmlFor="input-btn">Upload images</label>
                    </> :
                    <>
                        <button className="btn btn-secondary" onClick={() => setSelectedImages([])}>Cancel</button>
                        <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleUploadImages}>Upload {selectedImages.length} Images</button>
                    </>
            }
        </div>

        {/* Select Image List Show */}
        <div className="uploadpage__imglist">
            {
                selectedImages.map((file) => {
                    return <div className="image__item">
                        <p className="item__name">{file.name}</p>
                        <p className="item__type">{file.type}</p>
                        <p className="item__size">{file.size}</p>
                    </div>
                })
            }
        </div>
    </div>
}

export default UploadPage;
