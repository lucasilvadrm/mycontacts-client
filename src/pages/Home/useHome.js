import {
  useCallback, useEffect, useState, useDeferredValue, useMemo,
} from 'react';

import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // eslint-disable-next-line max-len
  // aguarda a renderização do searchTerm (urgent update) para depois executar as demais renderizações
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // useTransition serve para definir um estado como prioridade baixa no momento da renderização
  // const [isPending, startTransition] = useTransition();

  const filteredContacts = useMemo(
    // eslint-disable-next-line max-len
    () => contacts.filter(({ name }) => (name.toLowerCase().includes(deferredSearchTerm.toLowerCase()))),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTryAgain = () => {
    loadContacts();
  };

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteContactAfterConfirmation = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prev) => prev.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato excluído com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao excluir contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return {
    loading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleDeleteContactAfterConfirmation,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
