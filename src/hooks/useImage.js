import { useEffect, useState } from 'react';

const useImage = (data) => {
    const [img, setImg] = useState('');
    const [exists, setExists] = useState();
    const [imageData, setImageData] = useState({ img: '', exists: false });
    
    useEffect(() => {
        let image = new Image();
        image.onload = function() {
            setImg(data);
            setExists(true);
        }
        image.onerror = function() {
            setImg('/assets/user-not-found.png');
            setExists(false);
        }
        image.src = data;
    }, [data]);

    const image = (imageSrc) => {
        let src = new Image();
        src.onload = () => {
            setImageData({ ...imageData, img: imageSrc });
            setImageData({ ...imageData, exists: true });
        }
        src.onerror = () => {
            setImageData({ ...imageData, img: '/assets/user-not-found.png' });
            setImageData({ ...imageData, exists: false });
        }
        src.src = imageSrc;
        return imageData;
    }

    return { img, exists, image }
}

export default useImage;