/**
 * Функция определения что произошедшее событие было нажатием клавиша ESC
 * @param {*} evt - произошедшее событие
 * @returns  - true - была нажата клавиша ESC, fase - не была нажата клавиша ESC
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {isEscEvent};
