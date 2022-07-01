// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETE_EXPENSE, RECEIVE_COINS, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  coins: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_COINS:
    return { ...state, coins: action.payload };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload.expenseId),
    };
  default:
    return state;
  }
};

export default walletReducer;
