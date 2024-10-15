"use client";  

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";  
export const runtime = 'edge';

const FormComponent = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    url: "",
    file: null,
    authorName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      file: file,
    });
    setErrors((prevErrors) => ({ ...prevErrors, file: undefined }));
  };

  const handleDescriptionChange = (value) => {
    setFormValues({
      ...formValues,
      description: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, description: undefined }));
  };

  const validate = (values) => {
    let validationErrors = {};

    if (!values.title) {
      validationErrors.title = "Title is required";
    } else if (values.title.length < 3 || values.title.length > 100) {
      validationErrors.title = "Title must be between 3 and 100 characters";
    }

    if (!values.description) {
      validationErrors.description = "Description is required";
    }

    if (!values.authorName) {
      validationErrors.authorName = "Author Name is required";
    } else if (values.authorName.length < 2 || values.authorName.length > 50) {
      validationErrors.authorName = "Author Name must be between 2 and 50 characters";
    }

    if (!values.file) {
      validationErrors.file = "File upload is required";
    } else if (!/\.(jpg|jpeg|png)$/i.test(values.file.name)) {
      validationErrors.file = "File must be a JPG or PNG image";
    }

    if (!values.date) {
      validationErrors.date = "Date is required";
    } else if (isNaN(new Date(values.date).getTime())) {
      validationErrors.date = "Date is invalid";
    }

    if (!values.url) {
      validationErrors.url = "URL is required";
    } else if (!/^(https?:\/\/)/.test(values.url)) {
      validationErrors.url = "URL must start with http:// or https://";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form values are valid:", formValues);
      setFormValues({
        title: "",
        description: "",
        image: "",
        date: "",
        url: "",
        file: null,
        authorName: "",
      });
      setErrors({});
      window.location.href="/submitted"
    } else {
      setErrors(validationErrors);
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Details</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter title"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* Description with React Quill */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <div className=" quill-container">
          <ReactQuill 
            value={formValues.description}
            onChange={handleDescriptionChange}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'underline'],
                ['link'],
              ],
            }}
            className="mt-1"
            style={{ height: '200px', overflowY: 'auto' }}  
          />
        </div>
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/* Author Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Author Name</label>
        <input
          type="text"
          name="authorName"
          value={formValues.authorName}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter Author Name"
          required
        />
        {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName}</p>}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image (JPG/PNG)</label>
        <input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      {/* URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="text"
          name="url"
          value={formValues.url}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter URL"
          required
        />
        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
