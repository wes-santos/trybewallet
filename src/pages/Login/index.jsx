import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmailInput, validateEmail, validatePass } from '../../actions';
import './login.css';

class Login extends React.Component {
  render() {
    const { isDisabled, dispatch } = this.props;
    const MAX_PASSWORD_LENGTH = 5;
    return (
      <main className="container">
        <div className="content">
          <h1>Trybe</h1>
          <form className="formLogin">
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              placeholder="Digite seu e-mail"
              onKeyUp={ ({ target: { value } }) => {
                if (value.includes('@') && value.includes('.com')) {
                  dispatch(validateEmail(true));
                  dispatch(saveEmailInput(value));
                } else {
                  dispatch(validateEmail());
                }
              } }
              required
            />
            <input
              type="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              onKeyUp={ ({ target: { value } }) => (
                value.length >= MAX_PASSWORD_LENGTH
                  ? dispatch(validatePass(true))
                  : dispatch(validatePass())
              ) }
              required
            />
            <Link to="/carteira">
              <button
                type="submit"
                className={ isDisabled ? 'buttonDisabled' : 'buttonEnabled' }
                disabled={ isDisabled }
              >
                Entrar
              </button>
            </Link>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isDisabled: state.user.isDisabled,
});

export default connect(mapStateToProps)(Login);
