import {
  useCallback, useEffect, useState, useImperativeHandle,
} from 'react';
import isEmailValid from '../../utils/isEmailValid';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import { MAX_LENGTH_PHONE } from '../../utils/constants';
import CategoriesService from '../../services/CategoriesService';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm({ ref, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, hasErrors, getErrorMessageByFieldName,
  } = useErrors();

  // o retorno será atribuído ao current
  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  const isValidForm = !hasErrors && name;

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
    } catch {} finally {
      setIsLoadingCategories(false);
    }
  }, [setCategories, setIsLoadingCategories]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  };

  return {
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
  };
}
