// import PropTypes from 'prop-types';

import ToastMessage from '../ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage text="Error Toast" type="danger" />
      <ToastMessage text="Success Toast" type="success" />
    </Container>
  );
}

// ToastContainer.propTypes = {};

export default ToastContainer;
