interface InputStates {
  [key: string] : import('./types').InputState;
}

interface AssistedInputFields {
  diacritics?: import('./types').DiacriticsObject;
  specialChars?: string[];
  inputStates: InputStates;
}

interface Window {
  AssistedInputFields: AssistedInputFields;
}
