import React from 'react';

const StarRating = ({ rating }) => {
  // Ensure that the rating is within the range of 0 to 5
  const roundedRating = Math.min(Math.max(rating, 0), 5);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<span key={i} className="star full-star">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star empty-star">&#9734;</span>);
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
