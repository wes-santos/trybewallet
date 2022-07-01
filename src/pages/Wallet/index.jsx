import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../../components/WalletHeader';
import WalletForm from '../../components/WalletForm';
import { fetchCoinsThunk } from '../../actions';
import WalletTable from '../../components/WalletTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsThunk());
  }

  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
