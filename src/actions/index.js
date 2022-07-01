// Coloque aqui suas actions
export const EMAIL_INPUT = 'EMAIL_INPUT';
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_PASS = 'VALIDATE_PASS';
export const FETCH_COINS = 'FETCH_COINS';
export const REQUEST_COINS = 'REQUEST_COINS';
export const RECEIVE_COINS = 'RECEIVE_COINS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const FETCH_RIGHT_COINS = 'FETCH_RIGHT_COINS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmailInput = (email) => ({
  type: EMAIL_INPUT,
  payload: email,
});

export const validateEmail = (bool = false) => ({
  type: VALIDATE_EMAIL,
  payload: bool,
});

export const validatePass = (bool = false) => ({
  type: VALIDATE_PASS,
  payload: bool,
});

export const requestCoins = () => ({
  type: REQUEST_COINS,
});

export const receiveCoins = (coins) => ({
  type: RECEIVE_COINS,
  payload: coins,
});

export const saveExpenses = (expensesInfo = []) => ({
  type: SAVE_EXPENSES,
  payload: {
    expenses: expensesInfo,
  },
});

export const fetchCoinsThunk = (expenses = []) => (
  async (dispatch) => {
    dispatch(requestCoins());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const expensesInfo = {
      id: expenses[0],
      value: expenses[1],
      description: expenses[5],
      currency: expenses[2],
      method: expenses[3],
      tag: expenses[4],
      exchangeRates: data,
    };
    return (
      dispatch(receiveCoins(data)),
      expenses.length !== 0
        ? dispatch(saveExpenses(expensesInfo))
        : null
    );
  }
);

export const fetchRightCoinsThunk = () => (
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const rightData = Object.entries(data).filter((e) => e[0] !== 'USDT');
    return dispatch(receiveCoins(rightData));
  }
);

export const deleteExpense = (expense, id) => ({
  type: DELETE_EXPENSE,
  payload: {
    expenseValue: expense,
    expenseId: id,
  },
});
