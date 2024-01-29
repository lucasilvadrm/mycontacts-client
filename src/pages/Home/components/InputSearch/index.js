import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquisar contato..."
        onChange={onChange}
      />
    </Container>
  );
}

export default InputSearch;

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
