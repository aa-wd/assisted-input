import { EventTargetInput, InputState, AssistedInputTarget, AssistedInput, AssistedInputElement, } from './types';
import { getEmptyInputState } from './models';

const getCurrentInputIndex = (e: KeyboardEvent & EventTargetInput) => e.target.dataset.assistedinputid;

const getInputState = (e: AssistedInputTarget) => {
  const currentInputIndex = getCurrentInputIndex(e);
  return window.AssistedInputFields.inputStates[currentInputIndex];
};

const keyIsActive = (e: AssistedInputTarget, inputState: InputState) => {
  const isRepeatable = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

  if (isRepeatable.includes(e.key)) return false;

  if (e.key === inputState.activeKey) {
    e.preventDefault();
    return true;
  };
};

const getDiacriticBoxSelector = (diacriticBase: string) => `.diacritic-box[data-diacriticbase=${diacriticBase}]`;

const showDiacriticBox = (diacriticBase: string, input: AssistedInputElement) => {
  const diacriticBox = document.querySelector(getDiacriticBoxSelector(diacriticBase)) as HTMLDivElement;
  const assistedInputId = input.dataset.assistedinputid;
  const inputState = window.AssistedInputFields.inputStates[assistedInputId];
  const { left, top, height } = input.getBoundingClientRect();

  diacriticBox.style.display = 'flex';
  diacriticBox.style.left = `${left + 5}px`;
  diacriticBox.style.top = `${top - 0.5 * height}px`;

  inputState.diacriticBase = diacriticBase;
  inputState.showDiacritics = true;
};

const checkForSpecialCharacter = (
  key: string, inputState: InputState, currentPressCount: number, input: AssistedInputElement
) => {
  const { specialChars } = window.AssistedInputFields;

  if (specialChars!.includes(key)) {

    setTimeout(() => {
      if (key === inputState.activeKey && currentPressCount === inputState.pressCount) {
        showDiacriticBox(key, input);
      }
    }, 350);
  }
};

const handleKeyDownWithDiacritics = (e: AssistedInputTarget) => {
  e.preventDefault();
};

export const handleKeyDown = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);

  if (keyIsActive(e, inputState)) {
    return;
  }

  if (inputState.showDiacritics) {
    handleKeyDownWithDiacritics(e);
    return;
  }

  checkForSpecialCharacter(e.key, inputState, inputState.pressCount + 1, e.target);

  inputState.activeKey = e.key;
  inputState.pressCount += 1;
};

export const handleKeyPress = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);
};

export const handleKeyUp = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);

  inputState.activeKey = '';
};

export const handleBlur = (e: AssistedInputTarget) => {
  const index = e.target.dataset.assistedinputid;
  const inputState = window.AssistedInputFields.inputStates[index];

  if (inputState.diacriticBase) {
    const diacriticBox = document.querySelector(getDiacriticBoxSelector(inputState.diacriticBase)) as AssistedInputElement;
    if (diacriticBox) {
      diacriticBox.style.display = 'none';
    }
  }
  window.AssistedInputFields.inputStates[index] = getEmptyInputState();
};
