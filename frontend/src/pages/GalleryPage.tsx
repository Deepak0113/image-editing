import { FC, useEffect, useState } from "react";
import { getImagesAPI, getTotalImageCount, deleteImagesAPI } from "../api/api";
import '../styles/GalleryPage.css';
import { DeleteIcon, LeftArrow, RightArrow } from "../icons/icons";
import { generateImageUrlFromBuffer } from "../utility/helper";
import Board from "../components/Board";
import usePopupNotification from "../hooks/usePopupNotificationHook/usePopupNotification";

interface GalleryPageProps {
    images: ImageListItem[]
    handleImages: (imageList: ImageListItem[]) => void;
}

const GalleryPage: FC<GalleryPageProps> = ({ images, handleImages }) => {
    const [pageNo, setPageNo] = useState<number>(1);
    const [totalImagesCount, setTotalImagesCount] = useState<number>(0);
    const [selectDeleteImages, setSelectDeleteImages] = useState<Set<string>>(new Set());
    const displayLimit = 10;

    const [clickedImage, setClickedImage] = useState<string | null>(null);
    const { openPopupNotification, notification } = usePopupNotification();

    // state to handle delete mode
    const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

    // useeffect hook to get total number of images in db
    useEffect(() => {
        getTotalImageCount()
            .then((result) => setTotalImagesCount(prev => result.message))
            .catch((err) => console.log(err))
    }, []);

    // useeffect hook to get images
    useEffect(() => {
        if (images.length == 0 || images.length < pageNo * displayLimit) {
            console.log('getting from gallery');
            getGalleryImages();
        }
    }, [totalImagesCount, pageNo]);

    // handles corosal movement to left
    const handleCorosalLeft = () => {
        console.log(totalImagesCount);
        if (pageNo > 1) {
            setPageNo(prev => prev - 1);
            console.log('left', pageNo);
        }
    }

    // handles corosal movement to right
    const handleCorosalRight = () => {
        console.log(totalImagesCount);
        const isMoveRight = (((pageNo + 1) * displayLimit) - totalImagesCount) < displayLimit;

        if (isMoveRight) {
            setPageNo((prev) => prev + 1);
            console.log("right");
        }
    }

    // handles selecting image for deleting image
    const handleDeleteImage = (imageHash: string) => {
        if (!isDeleteMode) return;

        const select = new Set(selectDeleteImages);
        select.has(imageHash) ? select.delete(imageHash) : select.add(imageHash);
        setSelectDeleteImages(select);
    }

    // delete selected images using API
    const deleteImages = () => {
        if (selectDeleteImages.size === 0) return;

        deleteImagesAPI(Array.from(selectDeleteImages.keys()))
            .then((result) => {
                removeImagesFromList(Array.from(result.deletedImages));
                setTotalImagesCount((prev) => prev - selectDeleteImages.size);
                setSelectDeleteImages(new Set());
                openPopupNotification('Deleted images');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // this function is to removing the images from the gallery that are successfuly deleted
    const removeImagesFromList = (imagesToBeRemoved: string[]) => {
        let imagesTemp = images;

        imagesToBeRemoved.map((imageHash) => {
            imagesTemp = imagesTemp.filter((item) => item.imageHash === imageHash);
        })

        handleImages(imagesTemp);
    }

    // get images for gallery using API
    const getGalleryImages = async () => {
        try {
            const result = await getImagesAPI(displayLimit, pageNo);
            console.log(pageNo, pageNo * displayLimit, images.length);

            const imgs = images.slice(0, (pageNo - 1) * displayLimit);

            handleImages(
                [
                    ...(pageNo * displayLimit > images.length ? images.slice(0, (pageNo - 1) * displayLimit) : images),
                    ...result.map(imageRes => {
                        return {
                            imageBuffer: imageRes.imageBuffer,
                            imageUrl: generateImageUrlFromBuffer(imageRes.imageBuffer),
                            imageHash: imageRes.imageHash
                        }
                    })
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }

    const popupCloseToggle = () => {
        setClickedImage(null)
    }

    return <div className="gallerypage">
        {notification}

        {/* gallery nav */}
        <div className="gallerypage__topnav">
            {
                isDeleteMode ?
                    <>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setIsDeleteMode(false);
                                setSelectDeleteImages(new Set());
                            }}>
                            Cancel</button>
                        <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={deleteImages}>Delete {selectDeleteImages.size} images</button>
                    </> :
                    <button className="btn btn-primary" onClick={() => setIsDeleteMode(true)}>Delete images</button>
            }
        </div>

        {/* edit board */}
        {!isDeleteMode && clickedImage && <div className="popup">
            <Board popupCloseToggle={popupCloseToggle} imageUrl={clickedImage} />
        </div>}

        {/* gallery corosal */}
        {
            images.length === 0 ?
                <p>No images available</p> :
                <div className="corosal">
                    <button className="corosal__btn" onClick={handleCorosalLeft}>
                        <LeftArrow height={24} />
                    </button>
                    <button className="corosal__btn" onClick={handleCorosalRight}>
                        <RightArrow height={24} />
                    </button>
                    <div className="gallery__grid">
                        {
                            images
                                .slice((pageNo - 1) * displayLimit, pageNo * displayLimit)
                                .map((imageItem) => {
                                    return <div className="gallery__image__container" key={imageItem.imageHash + 123}>
                                        <img
                                            className="gallery__image"
                                            src={imageItem.imageUrl}
                                            alt={imageItem.imageHash}
                                            onClick={() => isDeleteMode ? handleDeleteImage(imageItem.imageHash) : setClickedImage(imageItem.imageUrl)} />
                                        {selectDeleteImages.has(imageItem.imageHash) && <DeleteIcon className="delete__icon" height={32} fill="#f0483e" />}
                                    </div>
                                })
                        }
                    </div>
                </div>
        }
    </div >
}

export default GalleryPage;
