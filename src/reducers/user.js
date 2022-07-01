import { EMAIL_INPUT, VALIDATE_EMAIL, VALIDATE_PASS } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  emailIsValid: false,
  passIsValid: false,
  isDisabled: true,
};

const TRUE = true;
const FALSE = false;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_INPUT:
    return {
      ...state,
      email: action.payload,
    };
  case VALIDATE_EMAIL:
    return {
      ...state,
      emailIsValid: action.payload,
      isDisabled: state.emailIsValid && state.passIsValid ? FALSE : TRUE,
    };
  case VALIDATE_PASS:
    return {
      ...state,
      passIsValid: action.payload,
      isDisabled: state.emailIsValid && state.passIsValid ? FALSE : TRUE,
    };
  default:
    return state;
  }
};

export default userReducer;
