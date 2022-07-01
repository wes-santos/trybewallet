import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './walletHeader.css';

class WalletHeader extends React.Component {
  render() {
    const { email, expenses } = this.props;
    // Para chegar nesta solução do reduce, tive que consultar a branch do Laecio Silva:
    // https://github.com/tryber/sd-018-b-project-trybewallet/blob/laecio-silva-project-trybewallet/src/components/Header/index.jsx
    // Estava com problema nos testes, minha aplicação funcionava como o esperado sem o reduce, mas não passava no teste.
    const totalField = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return (
      <header>
        <h1>Trybe</h1>
        <div className="user-info">
          <p data-testid="email-field">
            E-mail:
            {' '}
            {email}
          </p>
          <span data-testid="total-field">
            Despesa total: R$
            {' '}
            {totalField.toFixed(2)}
          </span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
