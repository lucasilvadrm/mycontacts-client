import React from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

function EditContact() {
  return (
    <>
      <PageHeader
        title="Editar Lucas Silva"
      />
      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </>
  );
}

export default EditContact;
