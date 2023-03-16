import React from 'react';

function Card({ card, onCardClick }) {

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <div key={card._id} className="gallery__card">
      <img className="gallery__image" style={{ backgroundImage: `url(${card.link})` }} alt={card.name} onClick={handleCardClick} />
      <button className="gallery__delete-button button" type="button"></button>
      <div className="gallery__caption">
        <p className="gallery__place-name">{card.name}</p>
        <div className="gallery__like-section">
          <button className="gallery__like-button button" type="button"></button>
          <p className="gallery__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;