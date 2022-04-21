import { useState } from 'react';

const useImageV2 = () => {

    const [img, setImg] = useState('');
    const [exists, setExists] = useState();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    return (data) => {
        let image = new Image();
        image.onload = function() {
            setImg(data);
            setExists(true);
            setWidth(this.width);
            setHeight(this.height);
        }
        image.onerror = function() {
            setImg('/assets/user-not-found.png');
            setExists(false);
        }
        image.src = data;
        

        return { img, exists, width, height };
    }
}

export default useImageV2;