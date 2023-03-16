import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import api from '../utils/api.js';

function App() {

  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, SetIsImagePopup] =React.useState(false);
  const [selectedCard, SetSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    SetIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    SetIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    SetIsImagePopup(true);
    SetSelectedCard(card);
  }

  function closeAllPopups() {
    SetIsEditAvatarPopupOpen(false);
    SetIsEditProfilePopupOpen(false);
    SetIsAddPlacePopupOpen(false);
    SetIsImagePopup(false);
    SetSelectedCard(null);
  };

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
        type="change-avatar"
        name="change-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__label">
            <input className="popup__text" id="avatar-link" type="URL" name="avatar" placeholder="Ссылка на новый аватар" required />
            <span className="avatar-link-error popup__text-error" id="avatar-link-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
        type="editing"
        name="editing"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__label">
            <input className="popup__text" id="name" type="text" name="name" minLength="2" maxLength="40" required />
            <span className="name-error popup__text-error" id="name-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__text" id="job" type="text" name="about" minLength="2" maxLength="200" required />
            <span className="job-error popup__text-error" id="job-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
        type="add-card"
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <label className="popup__label">
            <input className="popup__text" id="place-name" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="place-name-error popup__text-error" id="place-name-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__text" id="link" type="URL" name="link" placeholder="Ссылка на картинку" required />
            <span className="link-error popup__text-error" id="link-error"></span>
          </label>
        </PopupWithForm>

      <ImagePopup
      isOpen={isImagePopupOpen}
      card={selectedCard}
      onCardClick={handleCardClick}
      onClose={closeAllPopups} />

      <div className="popup popup_type_delete-card">
        <form className="popup__container_delete-card popup__container" name="delete" noValidate>
          <button className="button popup__close-button" type="button" aria-label="close"></button>
          <h2 className="popup__header popup__header_delete">Вы уверены?</h2>
          <button className="button popup__button" id="delete-agreement-button" type="submit">Да</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;