/* eslint-disable max-len */
import { useEffect } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useAnimatedList from '../../../hooks/useAnimatedList';

function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prev) => [...prev, {
        id: Math.random(), type, text, duration,
      }]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          onRemoveMessage={handleRemoveItem}
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}

// ToastContainer.propTypes = {};

export default ToastContainer;
