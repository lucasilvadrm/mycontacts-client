/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />
      <p>
        Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
      </p>
    </Container>
  );
}

export default SearchNotFound;

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
