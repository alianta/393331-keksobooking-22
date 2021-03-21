const form = document.querySelector('.ad-form');
const serverAddress =  'https://22.javascript.pages.academy/keksobooking';

const submitForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      serverAddress,
      {
        method: 'POST',
        body: formData,
      },
    );
  });
}

export {submitForm};
