import { EventTargetInput, InputState } from './types';

const getCurrentInputIndex = (e: KeyboardEvent & EventTargetInput) => e.target.dataset.assistedinputid;

const getInputState = (e: KeyboardEvent & EventTargetInput) => {
  const currentInputIndex = getCurrentInputIndex(e);
  return window._assistedInputFields.inputStates[currentInputIndex];
};

const keyIsActive = (e: KeyboardEvent, inputState: InputState) => {
  const isRepeatable = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

  if (isRepeatable.includes(e.key)) return false;

  if (e.key === inputState.activeKey) {
    e.preventDefault();
    return true;
  };
};

const checkForSpecialCharacter = (key: string, inputState: InputState, currentPressCount) => {
  const { specialChars } = window._assistedInputFields;
  if (specialChars.includes(key)) {

    setTimeout(() => {
      if (key === inputState.activeKey && currentPressCount === inputState.pressCount) {
        console.log('SHOW BAR FOR', key)
      }
    }, 350);
  }
};

export const handleKeyDown = (e: KeyboardEvent & EventTargetInput) => {
  const inputState = getInputState(e);

  if (keyIsActive(e, inputState)) {
    return;
  }

  checkForSpecialCharacter(e.key, inputState, inputState.pressCount + 1);

  inputState.activeKey = e.key;
  inputState.pressCount += 1;
};

export const handleKeyPress = (e: KeyboardEvent & EventTargetInput) => {
  const inputState = getInputState(e);
};

export const handleKeyUp = (e: KeyboardEvent & EventTargetInput) => {
  const inputState = getInputState(e);

  inputState.activeKey = '';
};
