import { handleKeyDown, handleKeyPress, handleKeyUp } from './listeners';
import { DiacriticsObject, AssistedInput } from './types';
import './main.css';

const init = () => {
  window._assistedInputFields = {
    inputStates: {},
  };
};

const addListeners = (input: HTMLInputElement) => {
  [
    ['keydown', handleKeyDown],
    ['keypress', handleKeyPress],
    ['keyup', handleKeyUp]
  ].forEach((eventAction: [string, EventListener]) => {
    const [ eventName, eventFunction ] = eventAction;
    input.addEventListener(eventName, eventFunction);
  });
};

const getEmptyInputState = () => ({
  activeKey: '',
  diacriticBase: null,
  diacriticIndex: 0,
  showDiacritics: false,
});

const createAssistedInputs = (diacritics: DiacriticsObject) : void => {
  const assistedInputs : NodeListOf<HTMLInputElement & AssistedInput> = document.querySelectorAll('input[data-assisted]');
  const { _assistedInputFields } = window;

  assistedInputs.forEach((input, inputIndex) => {
    input.dataset['assistedinputid'] = inputIndex;

    _assistedInputFields.diacritics = diacritics;
    _assistedInputFields.inputStates[inputIndex] = getEmptyInputState();

    addListeners(input);
  });
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
