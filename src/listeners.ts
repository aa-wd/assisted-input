import { EventTargetInput, InputState } from './types';

const getCurrentInputIndex = (e: KeyboardEvent & EventTargetInput) => e.target.dataset.assistedinputid;
const getInputState = (currentInputIndex: string) => window._assistedInputFields.inputStates[currentInputIndex];

const keyIsActive = (e: KeyboardEvent, inputState: InputState) => {
  const isRepeatable = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

  if (isRepeatable.includes(e.key)) return false;

  if (e.key === inputState.activeKey) {
    e.preventDefault();
    return true;
  };
};

export const handleKeyDown = (e: KeyboardEvent & EventTargetInput) => {
  const currentInputIndex = getCurrentInputIndex(e);
  const inputState = getInputState(currentInputIndex);

  if (keyIsActive(e, inputState)) {
    return;
  }

  inputState.activeKey = e.key;

};

export const handleKeyPress = (e: KeyboardEvent & EventTargetInput) => {
  const currentInputIndex = getCurrentInputIndex(e);
  const inputState = getInputState(currentInputIndex);
};

export const handleKeyUp = (e: KeyboardEvent & EventTargetInput) => {
  const currentInputIndex = getCurrentInputIndex(e);
  const inputState = getInputState(currentInputIndex);

  inputState.activeKey = '';
};
