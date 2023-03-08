import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

function Modal({ danger }) {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>Título do Modal</h1>
        <p>Corpo do Modal</p>

        <Footer>
          <button
            type="button"
            className="cancel-button"
          >
            Cancelar
          </button>
          <Button
            type="button"
            danger
          >
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

Modal.defaultProps = {
  danger: false,
};

Modal.propTypes = {
  danger: PropTypes.bool,
};

export default Modal;
