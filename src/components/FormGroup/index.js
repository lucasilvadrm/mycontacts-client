import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function FormGroup({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormGroup;
