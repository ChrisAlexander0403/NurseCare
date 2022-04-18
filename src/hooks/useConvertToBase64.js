const useConvertToBase64 = () => {

    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
    
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            }
        });
    }

    const handleFileInputChange = (Image, updateFilesBase64Cb) => {
        convertToBase64(Image)
            .then(result => {
                Image["base64"] = result;
                updateFilesBase64Cb(result);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return handleFileInputChange;
}

export default useConvertToBase64;