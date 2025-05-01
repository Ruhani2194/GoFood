import React, {  useState } from 'react';

export default function Footer() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    foodItemId: '',
    rating: '',
    review: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const apiUrl = 'http://localhost:5000/api/reviews';
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { userId, foodItemId, rating, review } = formData;
    if (!userId || !foodItemId || !rating || !review) {
      setMessage({ type: 'warning', text: 'Please fill in all fields.' });
      return false;
    }
    if (rating < 1 || rating > 5) {
      setMessage({ type: 'warning', text: 'Rating must be between 1 and 5.' });
      return false;
    }
    return true;
  };

  
  const resetForm = () => {
    setFormData({
      userId: '',
      foodItemId: '',
      rating: '',
      review: '',
    });
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create review.');
      }
      const newReview = await response.json();
      setReviews([...reviews, newReview]);
      resetForm();
      setMessage({ type: 'success', text: 'Review added successfully.' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <h2 className="mb-4">User Reviews</h2>
        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}
        <form onSubmit={handleCreateReview} className="mb-5">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="userId" className="form-label">
                User ID
              </label>
              <input
                type="text"
                className="form-control"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="foodItemId" className="form-label">
                Food Item ID
              </label>
              <input
                type="text"
                className="form-control"
                id="foodItemId"
                name="foodItemId"
                value={formData.foodItemId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                className="form-control"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="review" className="form-label">
                Review
              </label>
              <textarea
                className="form-control"
                id="review"
                name="review"
                rows="1"
                value={formData.review}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit Review'}
            </button>
          </div>
        </form>
        <div>
          {loading ? (
            <div className="text-center">
              <div
                className="spinner-border text-light"
                role="status"
              ></div>
              <span className="ms-2">Loading Reviews...</span>
            </div>
          ) : reviews.length > 0 ? (
            <div className="row">
              {reviews.map((review) => (
                <div className="col-md-6 mb-4" key={review._id}>
                  <div className="card bg-secondary text-light">
                    <div className="card-body">
                      <h5 className="card-title">
                        User: {review.userId} | Food Item: {review.foodItemId}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-warning">
                        Rating: {review.rating}/5
                      </h6>
                      <p className="card-text">{review.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
