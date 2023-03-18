import {React, useEffect, useState} from 'react';
import changeAvatar from '../images/change-avatar.svg';
import api from '../utils/api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    api.getInitialCards()
    .then((initialCards) => {
      setCards(initialCards)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" alt="" style={{ backgroundImage: `url(${userAvatar})` }} />
            <button className="button profile__change-avatar-button" onClick={onEditAvatar}>
              <img className="profile__change-avatar-image" src={changeAvatar} alt="Карандаш" />
            </button>
          </div>
          <div className="profile__text">
            <div className="profile__user">
              <h1 className="profile__full-name">{userName}</h1>
              <button className="profile__popup-open button" type="button" aria-label="open editing popup" onClick={onEditProfile}></button>
            </div>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button className="add-button button" type="button" aria-label="open new card adding popup" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;