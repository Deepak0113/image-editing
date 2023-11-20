import { useEffect, useState } from "react";
import UploadPage from "./pages/UploadPage";
import GalleryPage from "./pages/GalleryPage";

import './App.css';

// type for navigation to keep naivgation items only 'upload' or 'gallery'
type NavegationItems = 'upload' | 'gallery';

const App = () => {
    // state for currently selected navitaiton item
    const [currentNav, setCurrentNav] = useState<NavegationItems>('upload');

    // state for maintaining images
    const [images, setImages] = useState<ImageListItem[]>([]);

    useEffect(() => {
        console.log(images, images.length);
    }, [images])

    // function to maintain images data between components uploadpage and gallerypage
    const handleImages = (imageItem: ImageListItem[]) => {
        setImages(imageItem);
    }

    return <div className="app">
        {/* Navigation Bar */}
        <div className="navbar">
            <div className="bar">
                <div className="background-highliter"></div>
                <p className={`navbar__item btn ${currentNav==='upload' && 'btn-selected'}`} onClick={() => setCurrentNav('upload')}>Upload</p>
                <p className={`navbar__item btn ${currentNav==='gallery' && 'btn-selected'}`} onClick={() => setCurrentNav('gallery')}>Gallery</p>
            </div>
        </div>

        {/* app containers switch */}
        {
            currentNav === 'upload' ?
                <UploadPage images={images} handleImage={handleImages} /> : <GalleryPage images={images} handleImages={handleImages} />
        }
    </div>;
}

export default App;
