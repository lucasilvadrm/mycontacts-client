/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Container,
} from './styles';

import Loader from '../../components/Loader';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

function Home() {
  const {
    loading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleDeleteContactAfterConfirmation,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={loading} />
      {contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {(contacts.length > 0 && filteredContacts.length < 1 && !loading) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />
          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}?`}
            cancelLabel="Cancelar"
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleDeleteContactAfterConfirmation}
          >
            <p>Esta ação não pode ser desfeita!</p>
          </Modal>
          {(contacts.length < 1 && !loading) && <EmptyList />}
        </>
      )}
    </Container>
  );
}

export default Home;
