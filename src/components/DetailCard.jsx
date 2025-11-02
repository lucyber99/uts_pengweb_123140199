import React from 'react';

const DetailCard = ({ imageUrl, onToggleFavorite, isFavorite }) => {
  return (
    <div className="detail-card">
      <div className="image-container">
        <img src={imageUrl} alt="Animal" loading="lazy" />
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(imageUrl)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default DetailCard;
