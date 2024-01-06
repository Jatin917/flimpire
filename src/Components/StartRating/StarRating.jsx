import React from 'react';
import './StarRating.css'; // Import your CSS

function StarRating({ rating }) {
  const stars = [];
  const ratingAvg = Math.round(rating) / 2;
  // Loop 5 times for 5 stars (assuming a scale of 1-5)
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <span key={i} className={i <= ratingAvg ? 'filled' : ''}>
        &#9733;
      </span>,
    );
  }
  return (
    // eslint-disable-next-line no-return-assign
    <div
      className="star-rating"
      onMouseEnter={(e) => {
        e.currentTarget.title = rating.toFixed(2);
      }}
    >
      {stars}
    </div>
  );
}

export default StarRating;
