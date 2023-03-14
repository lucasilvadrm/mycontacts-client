import React from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../services/utils/toast';

function NewContact() {
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);
      toast({
        type: 'success',
        text: 'Cadastro realizado com sucesso!',
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
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
