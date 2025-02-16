// ImageUpload.js (Extracted from Apppreview.js)
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import './App.css';

function ImageUpload({ onUpload }) {
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    if (!file.type.startsWith('image/')) {
      setValidationError('Only image files are allowed!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File size exceeds 5MB!');
      return;
    }

    setValidationError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      setDataURL(binaryStr);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`container ${isDragActive ? 'drag-active' : ''}`}>
      <input {...getInputProps()} />
      <div className="zone">
        {dataURL ? (
          <div className="selected">
            <img src={dataURL} alt="preview" />
          </div>
        ) : (
          <div className="drop-zone">
            {isDragActive ? 'Drop your files here' : 'Click or drag file to upload'}
          </div>
        )}
        {validationError && <span className="error">{validationError}</span>}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default ImageUpload;
