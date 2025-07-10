
import React, { useState } from 'react';

const UploadFoodItem = () => {
  const [name, setName] = useState('');
  const [halfPrice, setHalfPrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const token = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !halfPrice || !fullPrice || !image) {
      setErrorMessage('Please fill in all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('halfPrice', halfPrice);
    formData.append('fullPrice', fullPrice);
    formData.append('image', image);

    try {
      const response = await fetch('https://gofood-3back.onrender.com/api/admin/add-food-item', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Food item uploaded successfully!');
        setName('');
        setHalfPrice('');
        setFullPrice('');
        setImage(null);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.message || 'Failed to upload food item.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upload Food Item</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Food Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter food name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="halfPrice" className="form-label">Price (Half)</label>
          <input
            type="number"
            id="halfPrice"
            value={halfPrice}
            onChange={(e) => setHalfPrice(e.target.value)}
            className="form-control"
            placeholder="Enter half plate price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullPrice" className="form-label">Price (Full)</label>
          <input
            type="number"
            id="fullPrice"
            value={fullPrice}
            onChange={(e) => setFullPrice(e.target.value)}
            className="form-control"
            placeholder="Enter full plate price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="form-control"
            accept="image/*"
            required
          />
        </div>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary w-100">Upload</button>
      </form>
    </div>
  );
};

export default UploadFoodItem;
