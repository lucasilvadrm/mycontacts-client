import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import { MAX_LENGTH_PHONE } from '../../utils/constants';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    setError, removeError, hasErrors, getErrorMessageByFieldName,
  } = useErrors();

  const isValidForm = !hasErrors && name;

  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError({ field: 'name' });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email inválido' });
    } else {
      removeError({ field: 'email' });
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));

    if (event.target.value && (formatPhone(event.target.value).length < MAX_LENGTH_PHONE - 1)) {
      setError({ field: 'phone', message: 'Telefone inválido' });
    } else {
      removeError({ field: 'phone' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome*"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('phone')}>
        <Input
          placeholder="Telefone"
          maxLength={MAX_LENGTH_PHONE}
          value={phone}
          onChange={handlePhoneChange}
          error={!!getErrorMessageByFieldName('phone')}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Selecione a categoria</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isValidForm}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
