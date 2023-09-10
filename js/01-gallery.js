import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML(
  'beforeend',
  createGalleryMarkup(galleryItems),
);
galleryContainer.addEventListener('click', handleClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"  data-source="${original}" />
        </a>
        </li>
        `;
    })
    .join('');
}

const instance = basicLightbox.create(
  `
      <img src="" alt="" width="800" height="600">

  `,
  {
    onShow: instance => {
      window.addEventListener('keydown', escKeyPress);
    },
    onClose: instance => {
      window.removeEventListener('keydown', escKeyPress);
    },
  },
);
function handleClick(event) {
  event.preventDefault();
  if (event.target.tagName !== 'IMG' || event.target === event.currentTarget)
    return;
  const currentImage = instance.element().querySelector('img');
  currentImage.src = event.target.dataset.source;
  currentImage.alt = event.target.alt;
  instance.show();
}
function escKeyPress(event) {
  if (event.code !== 'Escape') return;
  instance.close();
}
