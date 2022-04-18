import React, {useState, useRef} from 'react';
import { FaPlus } from 'react-icons/fa';
import useConvertToBase64 from '../../hooks/useConvertToBase64';
import { 
    FileUploadContainer, 
    // UploadFileBtn, 
    FilePreviewContainer,
    PreviewContainer,
    FileMetaData,
    RemoveIcon, 
    // UploadIcon
} from './InputFileStyles';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880;
const BYTES_PER_KILO_BYTE = 1024;


const convertBytesToKB = (bytes) => Math.round(bytes / BYTES_PER_KILO_BYTE);

const InputFile = ({
    isDark,
    updateFilesCb,
    updateFilesBase64Cb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}) => {
    const fileInput = useRef(null);
    const [files, setFiles] = useState({});
    
    let handleFileInputChange = useConvertToBase64();

// const handleUploadBtnClick = () => {
//     fileInput.current.click();
// }

const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;

    if(newFiles.length){
        let updatedFiles = addNewFiles(newFiles);
        setFiles(updatedFiles);
        callUpdateFilesCb(updatedFiles);
    }
}

const addNewFiles = (newFiles) => {
    for(let file of newFiles){
        if(file.size <= maxFileSizeInBytes){
            if(!otherProps.multiple){
                handleFileInputChange(file, updateFilesBase64Cb);
                return { file };
            }
            files[file.name] = file;
        }
    }
    return { ...files };
}

const convertNestedObjectToArray = (nestedObj) => Object.keys(nestedObj).map((key) => nestedObj[key]);

const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
};

const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
};

    return(
        <div style={{ display: 'flex' }}>
            <FileUploadContainer isDark={isDark}>
                <FaPlus style={{ color: isDark ? '#666' : '#999', fontSize: '40px' }}/>
                {/* <UploadFileBtn type={'button'} onClick={handleUploadBtnClick}>
                    <UploadIcon/>
                    <span>Cargar {otherProps.multiple ? "archivos" : "archivo"}</span>
                </UploadFileBtn> */}
                {/* <p className='size'>5MB Máximo</p> */}
                <input className='form-field' type={'file'} ref={fileInput} onChange={handleNewFileUpload} title={''} value={''} {...otherProps}/>
            </FileUploadContainer>

            <FilePreviewContainer>
                <div className='preview-list'>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return(
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <img
                                            className='preview-img'
                                            src={URL.createObjectURL(file)}
                                            alt={`Vista previa ${index}`}
                                        />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <RemoveIcon onClick={() => removeFile(fileName)}/>
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer >
                        );
                    })}
                </div>
            </FilePreviewContainer>
        </div>
    );
}

export default InputFile;