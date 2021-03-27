const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const NEW_IMAGE_CLASS = 'photo-preview';
const NEW_IMAGE_WIDTH = '70';
const NEW_IMAGE_HEIGHT = '70';
const NEW_IMAGE_ALT = 'Фотография жилья';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageChooser = document.querySelector('#images');
const imagesBlock = document.querySelector('.ad-form__photo');

/**
 * Функция загрузки изображения аватара
 */
const chooseAvatar = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
}

/**
 * Функция загрузки изображения фотографии жилья
 */
const chooseImage = () => {
  imageChooser.addEventListener('change', () => {
    const file = imageChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      const newImage = document.createElement('img');
      newImage.classList.add = NEW_IMAGE_CLASS;
      newImage.width = NEW_IMAGE_WIDTH;
      newImage.height = NEW_IMAGE_HEIGHT;
      newImage.alt = NEW_IMAGE_ALT;

      reader.addEventListener('load', () => {
        newImage.src = reader.result;
        imagesBlock.appendChild(newImage);
      });
      reader.readAsDataURL(file);
    }
  });
}

export {chooseAvatar, chooseImage}
