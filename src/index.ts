import { handleKeyDown, handleKeyUp, handleBlur } from './listeners';
import { DiacriticsObject, AssistedInputElement, EventNamesAndFunctions } from './types';
import { getEmptyInputState } from './models';
import './main.css';

const addListeners = (input: HTMLInputElement) => {
  const eventNamesAndFunctions : EventNamesAndFunctions = [
    ['keydown', handleKeyDown],
    ['keyup', handleKeyUp],
    ['blur', handleBlur]
  ];

  eventNamesAndFunctions.forEach((eventAction) => {
    const [ eventName, eventFunction ] = eventAction;
    input.addEventListener(eventName, eventFunction as EventListener);
  });
};

const createCharacterBox = (diacritic: string, diacriticIndex: number, diacriticBase: string) => {
  const characterBox = document.createElement('div');
  characterBox.classList.add('diacritic-box__character');
  characterBox.dataset.diacriticbase = diacriticBase;
  characterBox.dataset.diacriticindex = diacriticIndex.toString();

  if (diacriticIndex === 0) {
    characterBox.classList.add('diacritic-box__character--active');
  }
  const diacriticTextNode = document.createTextNode(diacritic);

  characterBox.appendChild(diacriticTextNode);
  return characterBox;
};

const createDiacriticBox = (diacriticBase: string) => {
  const diacriticBox = document.createElement('div');

  diacriticBox.classList.add('diacritic-box');
  diacriticBox.dataset.diacriticbase = diacriticBase;

  diacriticBox.style.display = 'none';
  return diacriticBox;
};

const createDiacriticBoxElements = (diacritics: DiacriticsObject) => {
  const fragment = document.createDocumentFragment();
  const { specialChars } = window.AssistedInputFields;

  specialChars!.forEach((char) => {
    const diacriticBox = createDiacriticBox(char);
    const diacriticsForChar = diacritics[char];

    diacriticsForChar.forEach((diacritic, diacriticIndex) => {
      const characterBox = createCharacterBox(diacritic, diacriticIndex, char);
      diacriticBox.appendChild(characterBox);
    });
    fragment.appendChild(diacriticBox);
  });
  document.body.appendChild(fragment);
};

const createAssistedInputs = (diacritics: DiacriticsObject) : void => {
  const assistedInputs : NodeListOf<AssistedInputElement> = document.querySelectorAll('input[data-assisted]');
  const { AssistedInputFields } = window;

  assistedInputs.forEach((input, inputIndex) => {
    input.dataset['assistedinputid'] = inputIndex.toString();

    AssistedInputFields.diacritics = diacritics;
    AssistedInputFields.specialChars = Object.keys(diacritics);
    AssistedInputFields.inputStates[inputIndex] = getEmptyInputState();

    addListeners(input);
  });
  createDiacriticBoxElements(diacritics);
};

const init = () => {
  window.AssistedInputFields = {
    inputStates: {},
    createAssistedInputs,
  };
};

init();

createAssistedInputs({
  'a': ['a', 'à', 'â', 'æ'],
  'c': ['c', 'ç'],
  'e': ['e', 'é', 'è', 'ê', 'ë'],
  'i': ['i', 'î', 'ï'],
  'o': ['o', 'ô', 'œ'],
  'u': ['u', 'û', 'ü', 'ù'],
});

export default createAssistedInputs;
