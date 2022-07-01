import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../actions';
import './walletTable.css';
import editIcon from './editIcon.svg';
import removeIcon from './removeIcon.svg';

class WalletTable extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  createCoinsNames() {
    return {
      USD: 'Dólar Comercial',
      CAD: 'Dólar Canadense',
      GBP: 'Libra Esterlina',
      ARS: 'Peso Argentino',
      BTC: 'Bitcoin',
      LTC: 'Litecoin',
      EUR: 'Euro',
      JPY: 'Iene Japonês',
      CHF: 'Franco Suíço',
      AUD: 'Dólar Australiano',
      CNY: 'Yuan Chinês',
      ILS: 'Novo Shekel Israelense',
      ETH: 'Ethereum',
      XRP: 'Ripple',
    };
  }

  handleClick({ target }, expenseValue, expenseId) {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseValue, expenseId));
    target.parentElement.parentElement.innerHTML = '';
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.length !== 0
              ? expenses.map((e) => (
                <tr key={ e.id }>
                  <td id="description">{ e.description }</td>
                  <td id="tag">{ e.tag }</td>
                  <td id="method">{ e.method }</td>
                  <td id="value">{ Number(e.value).toFixed(2) }</td>
                  <td id="currency">{ this.createCoinsNames()[e.currency] }</td>
                  <td id="cambio">
                    { Number(e.exchangeRates[e.currency].ask).toFixed(2) }
                  </td>
                  <td id="convertedValue">
                    {
                      (Number(e.value) * e.exchangeRates[e.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button" data-testid="edit-btn" className="edit">
                      <img src={ editIcon } alt="Icon Edit" />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ (event) => this.handleClick(
                        event,
                        (Number(e.value) * e.exchangeRates[e.currency].ask).toFixed(2),
                        e.id,
                      ) }
                      className="remove"
                    >
                      <img src={ removeIcon } alt="Remove Icon" />
                    </button>

                  </td>
                </tr>
              ))
              : expenses
          }
        </tbody>
      </table>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletTable);
