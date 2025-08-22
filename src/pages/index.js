import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "CoCo the CooCoo Cat!",
//     link: "https://lh3.googleusercontent.com/d/1LyIo52cf-KpSJAhErnJ0zx4lZV6JCa_S",
//   },
//   {
//     name: "Gucci got money!",
//     link: "https://lh3.googleusercontent.com/d/1lyPfagxVRzBso9HMW7jbCjrDJTs-n_K2",
//   },

//   {
//     name: "Best Birthday Yet!",
//     link: "https://lh3.googleusercontent.com/d/1ZnhMGXnS83fbill3s2umN2FDBsHcYJci",
//   },

//   {
//     name: "Korra the Dog.",
//     link: "https://lh3.googleusercontent.com/d/1Wg3tQj48Funmuebkpfpa492sd3Stez2g",
//   },

//   {
//     name: "Flowing through space and time.",
//     link: "https://lh3.googleusercontent.com/d/1eaP1R2swi3v3l9Nqwo2dsw6m2NfzqlWk",
//   },

//   {
//     name: "I think we found a spellbook...",
//     link: "https://lh3.googleusercontent.com/d/13i49W5fGNremTb95izNCElcjEeazrjkW",
//   },

//   {
//     name: "My spooky family!",
//     link: "https://lh3.googleusercontent.com/d/1MbKOi435wYzyexfZ1gmh4HOffkG6fhqU",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "397ad35c-b1dc-4afd-a845-5f2004b6d0d1", // Replace with your actual token
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    // Update profile info
    profileNameEl.textContent = users.name;
    profileDescriptionEl.textContent = users.about;
    profilePhotoEl.src = users.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const profilePhotoEl = document.querySelector(".profile__avatar");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
const editProfileSubmitBtn =
  editProfileModal.querySelector(".modal__submit-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#card-caption-input"
);
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const avatarModalCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const profileEditAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarFormEl = editAvatarModal.querySelector(".modal__form");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const deleteModal = document.querySelector("#delete-avatar-modal")

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
  openModal(deleteModal)
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
//can i add the escape and click to exit here
//if so how???
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}


//function handleEscapeKey(event) {}

editProfileBtn.addEventListener("click", function () {
  resetValidation(
    editProfileFormEl,
    [editProfileNameInput, editDescriptionInput],
    settings
  ); // fix
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
profileEditAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});
avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value, // Get the value from the profile name input field
      about: editDescriptionInput.value, // Get the value from the profile description input field
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      profilePhotoEl.src = data.avatar;
      closeModal(editProfileModal);
      disableButton(editProfileSubmitBtn, settings);
    })
    .catch(console.error);
}

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);
editAvatarFormEl.addEventListener("submit", handleAvatarSubmit);

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  api
    .editUserAvatar({
      avatar: editAvatarInput.value,
    })
    .then((data) => {
      profilePhotoEl.src = data.avatar;
      closeModal(editAvatarModal);
      evt.target.reset();
      disableButton(editAvatarSubmitBtn, settings);
    })
    .catch(console.error);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostDescriptionInput.value,
    link: newPostImageInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  evt.target.reset();
  disableButton(newPostSubmitBtn, settings);
  closeModal(newPostModal);
}

newPostFormEl.addEventListener("submit", handleAddCardSubmit);
//---------------------------------
// const editAvatarFormEl = editAvatarModal.querySelector(".modal__form");
// const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
// const editAvatarInput = editAvatarModal.querySelector("#avatar-link-input");


// initialCards.forEach(function (item) {
//   const cardElement = getCardElement(item);
//   cardsList.append(cardElement);
// });

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");

    closeModal(openedModal);
  }
}

// document.addEventListener("keyup", function (event) {
// if (event.key === "Escape") {
// const openedModal = document.querySelector(".modal_is-opened");

// closeModal(openedModal);
// }
// });

// i think that this selects aall modals and not the container
const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
