/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Container,
  ListHeader,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Modal from '../../components/Modal';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';

function Home() {
  const {
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

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <span>Ocorreu um erro ao obter os seus contatos!</span>
            <Button onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length > 0 && filteredContacts.length < 1 && !loading) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <p>
                Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
              </p>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader order={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>
                Nome
              </span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {(contacts.length < 1 && !loading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato” </strong>
                à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && <small>{contact.category.name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Trash" />
                </button>
              </div>
            </Card>
          ))}
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
        </>
      )}
    </Container>
  );
}

export default Home;
