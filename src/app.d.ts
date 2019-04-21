interface InputStates {
  [key: string] : import('./types').InputState;
}

interface AssistedInputFields {
  diacritics?: import('./types').DiacriticsObject;
  inputStates: InputStates;
}

interface Window {
  _assistedInputFields: AssistedInputFields;
}
