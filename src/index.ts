import './main.css';

interface DiacriticsObject {
  [key: string]: string[];
};

const addListeners = (element: HTMLInputElement) => {

};

const createAssistedInputs = (diacritics: DiacriticsObject) : void => {
  const assistedInputs = document.querySelectorAll('input[data-assisted]');

  assistedInputs.forEach((input) => {
    addListeners(input as HTMLInputElement);
  });
};

createAssistedInputs({
  i: [],
  a: [],
});

export default createAssistedInputs;
