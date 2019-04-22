import { EventTargetInput, InputState, AssistedInputTarget } from './types';

const getCurrentInputIndex = (e: KeyboardEvent & EventTargetInput) => e.target.dataset.assistedinputid;

const getInputState = (e: AssistedInputTarget) => {
  const currentInputIndex = getCurrentInputIndex(e);
  return window._assistedInputFields.inputStates[currentInputIndex];
};

const keyIsActive = (e: AssistedInputTarget, inputState: InputState) => {
  const isRepeatable = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

  if (isRepeatable.includes(e.key)) return false;

  if (e.key === inputState.activeKey) {
    e.preventDefault();
    return true;
  };
};

const showDiacriticBox = (diacriticBase: string, input: HTMLInputElement) => {
  const diacriticBox = document.querySelector(`.diacritic-box[data-diacriticbase=${diacriticBase}]`) as HTMLDivElement;
  const { left, top, height } = input.getBoundingClientRect();

  diacriticBox.style.display = 'flex';
  diacriticBox.style.left = `${left + 5}px`;
  diacriticBox.style.top = `${top - 0.5 * height}px`;
};

const checkForSpecialCharacter = (
  key: string, inputState: InputState, currentPressCount: number, input: HTMLInputElement
) => {
  const { specialChars } = window._assistedInputFields;

  if (specialChars!.includes(key)) {

    setTimeout(() => {
      if (key === inputState.activeKey && currentPressCount === inputState.pressCount) {
        showDiacriticBox(key, input);
      }
    }, 350);
  }
};

export const handleKeyDown = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);

  if (keyIsActive(e, inputState)) {
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
