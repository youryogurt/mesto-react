import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      type="add-card"
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
          ref={nameRef}
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
          ref={linkRef}
        />
        <span className="link-error popup__text-error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
