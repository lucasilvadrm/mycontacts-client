import React from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import useNewContact from './useNewContact';

function NewContact() {
  const {
    newContactFormRef,
    handleSubmit,
  } = useNewContact();

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        ref={newContactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
