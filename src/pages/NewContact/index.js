import React, { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

function NewContact() {
  const newContactFormRef = useRef(null);

  const handleSubmit = async (contact) => {
    try {
      await ContactsService.createContact(contact);

      newContactFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Cadastro realizado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao cadastrar contato!',
      });
    }
  };

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
