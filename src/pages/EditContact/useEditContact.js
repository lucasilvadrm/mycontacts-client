import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const contact = await ContactsService.getContactById(id);

        // executa código se o componente estiver montado
        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);

          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    };

    loadContact();
  }, [history, id, safeAsyncAction]);

  const handleSubmit = async (contact) => {
    try {
      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);
      toast({
        type: 'success',
        text: 'Editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao editar o contato!',
      });
    }
  };

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
