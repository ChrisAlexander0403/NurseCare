import React from 'react';
import { useParams } from 'react-router-dom';
import InputFile from '../components/inputProfile/InputFile';

const ServicesByCategory = () => {

    let { id } = useParams();

  return (
    <>
      <InputFile/>
    </>
  );
}

export default ServicesByCategory;