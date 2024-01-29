import React, {
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, Form } from './styles';
import { MAX_LENGTH_PHONE } from '../../utils/constants';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    categories,
    name,
    email,
    phone,
    categoryId,
    setCategoryId,
    isLoadingCategories,
    isSubmitting,
    isValidForm,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
  } = useContactForm({ ref, onSubmit });

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
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
