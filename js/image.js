const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageChooser = document.querySelector('#images');
const imagesBlock = document.querySelector('.ad-form__photo');

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
 *
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
      newImage.classList.add = 'photo-preview';
      newImage.width = '70';
      newImage.height = '70';
      newImage.alt = 'Фотография жилья';

      reader.addEventListener('load', () => {
        newImage.src = reader.result;
        imagesBlock.appendChild(newImage);
      });

      reader.readAsDataURL(file);
    }
  });
}

export {chooseAvatar, chooseImage}
