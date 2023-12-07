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
    // state to manage page number for corosal slider
    const [pageNo, setPageNo] = useState<number>(1);

    // state to manage count of total images for a user
    const [totalImagesCount, setTotalImagesCount] = useState<number>(0);

    // state that stores imageid that should be deleted
    const [selectDeleteImages, setSelectDeleteImages] = useState<Set<string>>(new Set());

    // corosal slider images limit
    const displayLimit = 10;

    // state to manage the clicked image to use it for editing
    const [clickedImage, setClickedImage] = useState<string | null>(null);

    // custom hook to manage popup notification
    const { openPopupNotification, notification } = usePopupNotification();

    // state to handle delete mode
    const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

    // useEffect hook to get total number of images that a user have
    useEffect(() => {
        getTotalImageCount()
            .then((result) => {
                setTotalImagesCount(result.data.count);
                console.log(result);
            })
            .catch((err) => console.log(err))
    }, []);

    // useEffect hook to get images
    useEffect(() => {
        if (images.length == 0 || images.length < pageNo * displayLimit) {
            console.log('getting from gallery');
            getGalleryImages();
        }
    }, [totalImagesCount, pageNo]);

    // function to handle corosal to move left
    const handleCorosalLeft = () => {
        console.log(totalImagesCount);
        if (pageNo > 1) {
            setPageNo(prev => prev - 1);
            console.log('left', pageNo);
        }
    }

    // function to handle corosal to move right
    const handleCorosalRight = () => {
        console.log(totalImagesCount);
        const isMoveRight = (((pageNo + 1) * displayLimit) - totalImagesCount) < displayLimit;

        if (isMoveRight) {
            setPageNo((prev) => prev + 1);
            console.log("right");
        }
    }

    // function to handle selecting image for deleting image
    const handleDeleteImage = (imageHash: string) => {
        if (!isDeleteMode) return;

        const select = new Set(selectDeleteImages);
        select.has(imageHash) ? select.delete(imageHash) : select.add(imageHash);
        setSelectDeleteImages(select);
    }

    // function to delete selected images using API
    const deleteImages = () => {
        if (selectDeleteImages.size === 0) return;

        deleteImagesAPI(Array.from(selectDeleteImages.keys()))
            .then((result) => {
                console.log(result)
                const toBeDeletedImagesIds = result.data.filter(value => value.isDeleted).map(item => item.imageId);;
                removeImagesFromList(Array.from(toBeDeletedImagesIds));
                setTotalImagesCount((prev) => prev - selectDeleteImages.size);
                openPopupNotification('Deleted images');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // function to remove the images from the gallery that are successfuly deleted
    const removeImagesFromList = (imagesToBeRemoved: string[]) => {
        let imagesTemp = images;
        let selectDeleteImageTemp = selectDeleteImages;

        imagesToBeRemoved.map((imageId) => {
            imagesTemp = imagesTemp.filter((item) => item.imageId !== imageId);
            selectDeleteImageTemp.delete(imageId);
        })
        
        setSelectDeleteImages(new Set(selectDeleteImageTemp));
        handleImages(imagesTemp);
    }

    // get images for gallery using API
    const getGalleryImages = async () => {
        try {
            const result: IncomingGetImageResponse = await getImagesAPI(displayLimit, pageNo);
            const imgs = images.slice(0, (pageNo - 1) * displayLimit);

            handleImages(
                [
                    ...(pageNo * displayLimit > images.length ? images.slice(0, (pageNo - 1) * displayLimit) : images),
                    ...result.data.map(imageRes => {
                        return {
                            imageBuffer: imageRes.buffer,
                            imageUrl: generateImageUrlFromBuffer(imageRes.buffer as { data: Buffer; type: string; }),
                            imageId: imageRes.imageId
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
        {images.length>0 && <div className="gallerypage__topnav">
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
        </div>}

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
                                    return <div className="gallery__image__container" key={imageItem.imageId as string + 123}>
                                        <img
                                            className="gallery__image"
                                            src={imageItem.imageUrl}
                                            alt={imageItem.imageId as string}
                                            onClick={() => isDeleteMode ? handleDeleteImage(imageItem.imageId as string) : setClickedImage(imageItem.imageUrl)} />
                                        {
                                            selectDeleteImages.has(imageItem.imageId as string) &&
                                            <DeleteIcon className="delete__icon" height={32} fill="#f0483e" />
                                        }
                                    </div>
                                })
                        }
                    </div>
                </div>
        }
    </div >
}


// export GalleryPage
export default GalleryPage;
