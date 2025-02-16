import React, { useState } from 'react';
import '../index.css'; // Ensure CSS is loaded

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    instagramhandle: '',
    linkedin: '',
    facebook: '',
    xortwitter: '',
    stockimages: '',
    uploadvideo: '',
    uploadlogo: '',
    referencelink: '',
  });

  const [errors, setErrors] = useState({
    companyName: false,
    instagramhandle: false,
    linkedin: false,
    facebook: false,
    xortwitter: false,
    stockimages: false,
    uploadvideo: false,
    uploadlogo: false,
    referencelink: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleFileChange = (files, fieldName) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [fieldName]: files[0].name,
      });
      setErrors({
        ...errors,
        [fieldName]: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">Company Name {errors.companyName && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className={`form-input ${errors.companyName ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Instagram Handle (ID) {errors.instagramhandle && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="instagramhandle" value={formData.instagramhandle} onChange={handleInputChange} className={`form-input ${errors.instagramhandle ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">LinkedIn Profile {errors.linkedin && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className={`form-input ${errors.linkedin ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Facebook Page {errors.facebook && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="facebook" value={formData.facebook} onChange={handleInputChange} className={`form-input ${errors.facebook ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">X (formerly Twitter) {errors.xortwitter && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="xortwitter" value={formData.xortwitter} onChange={handleInputChange} className={`form-input ${errors.xortwitter ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Stock Images Upload {errors.stockimages && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="file" name="stockimages" onChange={(e) => handleFileChange(e.target.files, 'stockimages')} className={`form-input ${errors.stockimages ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Video Upload {errors.uploadvideo && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="file" name="uploadvideo" accept="video/*" onChange={(e) => handleFileChange(e.target.files, 'uploadvideo')} className={`form-input ${errors.uploadvideo ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Upload Logo {errors.uploadlogo && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="file" name="uploadlogo" onChange={(e) => handleFileChange(e.target.files, 'uploadlogo')} className={`form-input ${errors.uploadlogo ? 'error' : ''}`} />
      </div>

      <div className="form-group">
        <label className="form-label">Reference Links {errors.referencelink && <span style={{ color: 'red' }}>*</span>}</label>
        <input type="text" name="referencelink" value={formData.referencelink} onChange={handleInputChange} className={`form-input ${errors.referencelink ? 'error' : ''}`} />
      </div>

      <div className="button-group">
        <button type="submit" className="form-button">Submit</button>
      </div>
    </form>
  );
};

export default Form;
