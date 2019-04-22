import { handleKeyDown, handleKeyPress, handleKeyUp, handleBlur } from './listeners';
import { DiacriticsObject, AssistedInputElement, AssistedInputTarget, EventNamesAndFunctions } from './types';
import { getEmptyInputState } from './models';
import './main.css';

const init = () => {
  window.AssistedInputFields = {
    inputStates: {},
  };
};

const addListeners = (input: HTMLInputElement) => {
  const eventNamesAndFunctions : EventNamesAndFunctions = [
    ['keydown', handleKeyDown],
    ['keypress', handleKeyPress],
    ['keyup', handleKeyUp],
    ['blur', handleBlur]
  ];

  eventNamesAndFunctions.forEach((eventAction) => {
    const [ eventName, eventFunction ] = eventAction;
    input.addEventListener(eventName, eventFunction as EventListener);
  });
};

const createCharacterBox = (diacritic: string, isActive: boolean) => {
  const characterBox = document.createElement('div');

  characterBox.classList.add('diacritic-box__character');
  if (isActive) {
    characterBox.classList.add('diacritic-box__character--active');
  }
  const diacriticTextNode = document.createTextNode(diacritic);

  characterBox.appendChild(diacriticTextNode);
  return characterBox;
};

const createDiacriticBox = (diacriticBase: string) => {
  const diacriticBox = document.createElement('div');
  // const { left, top, height } = input.getBoundingClientRect();
  //diacriticBox.style.left = `${left + 5}px`;
  //diacriticBox.style.top = `${top - 0.5 * height}px`;

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
      const characterBox = createCharacterBox(diacritic, diacriticIndex === 0);
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
