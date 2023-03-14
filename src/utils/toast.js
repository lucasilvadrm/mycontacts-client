const toast = ({ type, text }) => {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });
  document.dispatchEvent(event);
};

export default toast;