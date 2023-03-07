import React from 'react';
import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width={201} />
    </Container>
  );
}

export default Header;
