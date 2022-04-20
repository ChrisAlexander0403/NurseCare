import { useState } from 'react';

const useImageV2 = () => {

    const [img, setImg] = useState('');
    const [exists, setExists] = useState();

    return (data) => {
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

        return { img, exists };
    }
}

export default useImageV2;