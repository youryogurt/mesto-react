import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import api from '../utils/api.js';
import {React, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, SetIsImagePopup] = useState(false);
  const [selectedCard, SetSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    SetIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    SetIsAddPlacePopupOpen(true);
  }

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
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo(name, about).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar({avatar}) {
    api.setUserAvatar(avatar).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    });
  }

  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo);
    });
    api.getInitialCards()
    .then((initialCards) => {
      setCards(initialCards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

          <PopupWithForm
            type="change-avatar"
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__text"
                id="avatar-link"
                type="URL"
                name="avatar"
                placeholder="Ссылка на новый аватар"
                required
              />
              <span
                className="avatar-link-error popup__text-error"
                id="avatar-link-error"
              ></span>
            </label>
          </PopupWithForm>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm
            type="add-card"
            name="add-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__text"
                id="place-name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
              />
              <span
                className="place-name-error popup__text-error"
                id="place-name-error"
              ></span>
            </label>
            <label className="popup__label">
              <input
                className="popup__text"
                id="link"
                type="URL"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span
                className="link-error popup__text-error"
                id="link-error"
              ></span>
            </label>
          </PopupWithForm>

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onCardClick={handleCardClick}
            onClose={closeAllPopups}
          />

          <div className="popup popup_type_delete-card">
            <form
              className="popup__container_delete-card popup__container"
              name="delete"
              noValidate
            >
              <button
                className="button popup__close-button"
                type="button"
                aria-label="close"
              ></button>
              <h2 className="popup__header popup__header_delete">Вы уверены?</h2>
              <button
                className="button popup__button"
                id="delete-agreement-button"
                type="submit"
              >
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
