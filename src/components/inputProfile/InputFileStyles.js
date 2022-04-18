import styled from 'styled-components';
import {RiFileUploadLine} from 'react-icons/ri';
// import {FiTrash2} from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

export const UploadIcon = styled(RiFileUploadLine)`
  font-size: 22px;
  margin-right: 5px;
  border-right: 2px solid;
  width: 20%;
`;

export const RemoveIcon = styled(CgClose)`
  &:hover{
    color: red;
    cursor: pointer;
  }
`;

export const FileUploadContainer = styled.div`
    position: relative;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .1);
    /* box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'}; */
    width: 100px;
    height: 100px;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: none;
    border-radius: 20px;
    background: ${props => props.isDark ? '#222' : '#DDD'};
    cursor: pointer;

    .drag-drop {
      font-weight: bold;
      margin-top: 0;
      text-align: center;
      color: #2E8049;
    }

    .size {
      color: #2E8049;
      font-size: 10px;
      margin: 10px 0 0;
    }

    .form-field {
      font-size: 18px;
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      text-transform: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
`;

export const UploadFileBtn = styled.button`
  margin: 20px 0 0;
  box-sizing: border-box;
  border-radius: 15px;
  appearance: none;
  background-color: transparent;
  border: 1px solid #2E8049;
  cursor: pointer;
  font-size: 14px;
  padding: 15px 5px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: #2E8049;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: .1%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 110%;
    background: #2E8049;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    background: transparent;
    &:after {
      width: 110%;
    }
  }

  &:focus {
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
  span {
    margin-left: 10px;
  }
`;

export const FilePreviewContainer = styled.div`

  span {
    font-size: 14px;
  }

  .preview-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const FileMetaData = styled.div`
  display: ${(props) => (props.isImageFile ? "none" : "flex")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.4);

  span {
    font-size: 12px;
  }

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.div`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 15px;
  overflow: hidden;
  margin-left: 15px;

  &:hover {
    background: rgba(0,0,0,.55);

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;