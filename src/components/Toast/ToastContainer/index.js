/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prev) => [...prev, { id: Math.random(), type, text }]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = (messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          onRemoveMessage={handleRemoveMessage}
          key={message.id}
          message={message}
        />
      ))}
    </Container>
  );
}

// ToastContainer.propTypes = {};

export default ToastContainer;
