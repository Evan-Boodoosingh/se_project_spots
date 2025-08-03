const initialCards = [
  {
    name: "CoCo the CooCoo Cat!",
    link: "https://lh3.googleusercontent.com/d/1LyIo52cf-KpSJAhErnJ0zx4lZV6JCa_S",
  },
  {
    name: "Gucci got money!",
    link: "https://lh3.googleusercontent.com/d/1lyPfagxVRzBso9HMW7jbCjrDJTs-n_K2",
  },

  {
    name: "Best Birthday Yet!",
    link: "https://lh3.googleusercontent.com/d/1ZnhMGXnS83fbill3s2umN2FDBsHcYJci",
  },

  {
    name: "Korra the Dog.",
    link: "https://lh3.googleusercontent.com/d/1Wg3tQj48Funmuebkpfpa492sd3Stez2g",
  },

  {
    name: "Flowing through space and time.",
    link: "https://lh3.googleusercontent.com/d/1eaP1R2swi3v3l9Nqwo2dsw6m2NfzqlWk",
  },

  {
    name: "I think we found a spellbook...",
    link: "https://lh3.googleusercontent.com/d/13i49W5fGNremTb95izNCElcjEeazrjkW",
  },

  {
    name: "My spooky family!",
    link: "https://lh3.googleusercontent.com/d/1MbKOi435wYzyexfZ1gmh4HOffkG6fhqU",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
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
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#card-caption-input"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

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
    cardElement.remove();
    cardElement = null;
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
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editDescriptionInput.value;

  closeModal(editProfileModal);
}

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostDescriptionInput.value,
    link: newPostImageInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  closeModal(newPostModal);
  evt.target.reset()
}

newPostFormEl.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

