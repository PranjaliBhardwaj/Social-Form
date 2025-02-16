import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import './App.css'
import Form from './components/Form.js'; // Adjust the path if necessary
import logo from './Logo_dark.png'; // Import the logo image

function MyDropzone() {
  const [dataURL, setDataURL] = useState(null)
  const [uploadedURL, setUploadedURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    // Validate file type (only images allowed)
    if (!file.type.startsWith('image/')) {
      setValidationError('Only image files are allowed!')
      return
    }

    // Validate file size (e.g., less than 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File size exceeds 5MB!')
      return
    }

    setValidationError(null) // Clear validation errors if valid

    const reader = new FileReader()
    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = () => console.log("file reading has failed")
    reader.onload = () => {
      const binaryStr = reader.result
      setDataURL(binaryStr)
    }
    reader.readAsDataURL(file)
  }, [])

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop })

  const selectedFile = acceptedFiles[0]

  const uploadImage = async () => {
    if (!selectedFile) {
      setError("No file selected!")
      return
    }

    setLoading(true)
    setError(null)

    let formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed!')
      }

      const data = await response.json()
      setUploadedURL(data.url)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div {...getRootProps()} className={`container ${isDragActive ? 'drag-active' : ''}`}>
      <input {...getInputProps()} />
      <div className="zone">
        {dataURL ? (
          <div className="selected">
            <img src={dataURL} alt="preview" />
            <div className="actions">
              {loading ? (
                <span className="loading">Uploading...</span>
              ) : uploadedURL ? (
                <span className="uploaded-txt">Uploaded!</span>
              ) : (
                <button onClick={uploadImage} className="upload-btn">
                  Upload
                </button>
              )}
              <button onClick={() => setDataURL(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="drop-zone">
            {isDragActive ? (
              <div className="drop-files">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="50"
                  width="50"
                  fill="currentColor"
                >
                  <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
                </svg>
              </div>
            ) : (
              <div className="drag-files">
                Drop your files anywhere or click to browse
              </div>
            )}
          </div>
        )}
        {validationError && <span className="error">{validationError}</span>}
        {error && <span className="error">{error}</span>}
        {uploadedURL && (
          <a target="_blank" href={uploadedURL}>
            <span className="uploaded-url">{uploadedURL}</span>
          </a>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" className="App-logo" />
      <div className="heading">
        <h1><b>Company Information Form</b></h1>
      </div>
      <Form />
      <MyDropzone />
    </div>
  );
}

export default App;
