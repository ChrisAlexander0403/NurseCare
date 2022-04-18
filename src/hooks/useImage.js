import { useEffect, useState } from 'react';

const useImage = (data) => {
    const [img, setImg] = useState('');
    const [exists, setExists] = useState();
    
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

    return { img, exists }
}

export default useImage;