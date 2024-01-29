import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
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

  return {
    newContactFormRef,
    handleSubmit,
  };
}
