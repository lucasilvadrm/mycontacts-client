import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = (event) => {
      setMessages((prev) => [...prev, { id: Math.random(), ...event.detail }]);
    };

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}

// ToastContainer.propTypes = {};

export default ToastContainer;
