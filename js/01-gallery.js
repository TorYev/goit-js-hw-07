import { galleryItems } from "./gallery-items.js";
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;
galleryContainer.addEventListener("click", onGalleryClick);
function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
          </li>`
    )
    .join("");
}
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const bigImageUrl = event.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${bigImageUrl}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscapePress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscapePress);
      }
    }
  );
  instance.show();
  function onEscapePress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
