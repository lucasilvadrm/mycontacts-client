import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Button from '../../../../components/Button';
import sad from '../../../../assets/images/sad.svg';

function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <span>Ocorreu um erro ao obter os seus contatos!</span>
        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}

export default ErrorStatus;

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
