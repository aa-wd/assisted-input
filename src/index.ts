import { handleKeyDown, handleKeyPress, handleKeyUp } from './listeners';
import { DiacriticsObject, AssistedInput, EventNamesAndFunctions } from './types';
import './main.css';

const init = () => {
  window._assistedInputFields = {
    inputStates: {},
  };
};

const addListeners = (input: HTMLInputElement) => {
  const eventNamesAndFunctions : EventNamesAndFunctions = [
    ['keydown', handleKeyDown],
    ['keypress', handleKeyPress],
    ['keyup', handleKeyUp]
  ];

  eventNamesAndFunctions.forEach((eventAction) => {
    const [ eventName, eventFunction ] = eventAction;
    input.addEventListener(eventName, eventFunction as EventListener);
  });
};

const getEmptyInputState = () => ({
  activeKey: '',
  diacriticBase: null,
  diacriticIndex: 0,
  showDiacritics: false,
  pressCount: 0,
});

const createCharacterBox = (diacritic: string) => {
  const characterBox = document.createElement('div');

  characterBox.classList.add('diacritic-box__character');
  const diacriticTextNode = document.createTextNode(diacritic);

  characterBox.appendChild(diacriticTextNode);
  return characterBox;
};

const createDiacriticBox = (diacriticBase: string) => {
  const diacriticBox = document.createElement('div');
  // const { left, top, height } = input.getBoundingClientRect();

  diacriticBox.classList.add('diacritic-box');
  diacriticBox.dataset.diacriticbase = diacriticBase;
  //diacriticBox.style.left = `${left + 5}px`;
  //diacriticBox.style.top = `${top - 0.5 * height}px`;
  diacriticBox.style.display = 'none';
  return diacriticBox;
};

const createDiacriticBoxElements = (diacritics: DiacriticsObject) => {
  const fragment = document.createDocumentFragment();
  const { specialChars } = window._assistedInputFields;

  specialChars!.forEach((char) => {
    const diacriticBox = createDiacriticBox(char);
    const diacriticsForChar = diacritics[char];

    diacriticsForChar.forEach((diacritic) => {
      const characterBox = createCharacterBox(diacritic);
      diacriticBox.appendChild(characterBox);
    });
    fragment.appendChild(diacriticBox);
  });
  document.body.appendChild(fragment);
};

const createAssistedInputs = (diacritics: DiacriticsObject) : void => {
  const assistedInputs : NodeListOf<HTMLInputElement & AssistedInput> = document.querySelectorAll('input[data-assisted]');
  const { _assistedInputFields } = window;

  assistedInputs.forEach((input, inputIndex) => {
    input.dataset['assistedinputid'] = inputIndex.toString();

    _assistedInputFields.diacritics = diacritics;
    _assistedInputFields.specialChars = Object.keys(diacritics);
    _assistedInputFields.inputStates[inputIndex] = getEmptyInputState();

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
