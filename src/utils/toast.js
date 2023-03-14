import EventManager from '../lib/eventManager';

export const toastEventManager = new EventManager();

const toast = ({ type, text }) => {
  toastEventManager.emit('addtoast', { type, text });
};

export default toast;
