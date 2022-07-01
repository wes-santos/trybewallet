import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsThunk } from '../../actions';
import './walletForm.css';

const DEFAULT_EXPENSES_OBJECT = {
  value: 0,
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.saveValueOnState = this.saveValueOnState.bind(this);
    this.state = {
      expensesObject: DEFAULT_EXPENSES_OBJECT,
    };
  }

  handleClick(event) {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const { expensesObject } = this.state;
    const expensesList = [
      expenses.length,
      expensesObject.value,
      expensesObject.currency,
      expensesObject.method,
      expensesObject.tag,
      expensesObject.description,
    ];
    dispatch(fetchCoinsThunk(expensesList));
    this.setState(
      {
        expensesObject: DEFAULT_EXPENSES_OBJECT,
      },
    );
  }

  saveValueOnState(event) {
    event.preventDefault();
    const { target } = event;
    const { value } = target;
    this.setState((prevState) => ({
      expensesObject: { ...prevState.expensesObject, [target.name]: value },
    }));
  }

  render() {
    const { coins } = this.props;
    const { expensesObject: { value, currency, method, tag, description } } = this.state;
    return (
      <main>
        <form className="create">
          <label htmlFor="valueInput">
            Valor
            <input
              type="number"
              name="value"
              id="valueInput"
              data-testid="value-input"
              onChange={ this.saveValueOnState }
              value={ value }
            />
          </label>
          <label htmlFor="decriptionInput">
            Descrição
            <input
              type="text"
              id="descriptionInput"
              name="description"
              data-testid="description-input"
              onChange={ this.saveValueOnState }
              value={ description }
            />
          </label>
          <label htmlFor="coinSelect">
            Moeda
            <select
              id="coinSelect"
              name="currency"
              data-testid="currency-input"
              onChange={ this.saveValueOnState }
              value={ currency }
            >
              {coins !== undefined
                ? Object.keys(coins).filter((e) => e !== 'USDT').map((coin, i) => (
                  <option value={ coin } key={ i } data-testid={ coin }>
                    {coin}
                  </option>
                ))
                : <option value="">Aguarde</option>}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento
            <select
              id="paymentMethod"
              name="method"
              data-testid="method-input"
              onChange={ this.saveValueOnState }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tagCategory">
            Tag
            <select
              id="tagCategory"
              name="tag"
              data-testid="tag-input"
              onChange={ this.saveValueOnState }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </main>
    );
  }
}

WalletForm.propTypes = {
  coins: PropTypes.objectOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.wallet.coins,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
