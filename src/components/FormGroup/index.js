import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function FormGroup({ children, error }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};

export default FormGroup;
