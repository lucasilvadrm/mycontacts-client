import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import { MAX_LENGTH_PHONE } from '../../utils/constants';
import CategoriesService from '../../services/CategoriesService';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, hasErrors, getErrorMessageByFieldName,
  } = useErrors();

  const isValidForm = !hasErrors && name;

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
    } catch {} finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
    clearFields();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
    >
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome*"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('phone')}>
        <Input
          placeholder="Telefone"
          maxLength={MAX_LENGTH_PHONE}
          value={phone}
          onChange={handlePhoneChange}
          error={!!getErrorMessageByFieldName('phone')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isValidForm}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
