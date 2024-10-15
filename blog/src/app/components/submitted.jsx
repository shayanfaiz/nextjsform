"use client";

import React, { useEffect, useState } from 'react';

const SubmittedPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
      setForms(savedForms);
    }
  }, []);  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 my-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Submitted Forms</h1>
      {forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        forms.map((form, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-md mb-4">
            <h2 className="font-bold">{form.title}</h2>
            <p><strong>Author:</strong> {form.authorName}</p>
            <p><strong>Description:</strong> {form.description}</p>
            <p><strong>Date:</strong> {form.date}</p>
            <p><strong>URL:</strong> <a href={form.url} className="text-blue-600">{form.url}</a></p>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmittedPage;
