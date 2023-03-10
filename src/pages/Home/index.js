import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  InputSearchContainer,
  Card,
  Container, Header, ListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3333/contacts')
      .then(async (response) => {
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  }, []);

  if (loading) return <h1>Carregando</h1>;

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts?.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                <small>{contact.category_name}</small>
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to="/edit/123edit/123">
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Trash" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}

export default Home;

// fetch('http://localhost:3333/contacts')
//   .then(async (response) => {
//     const json = await response.json();
//     console.log(json);
//   })
//   .catch((error) => console.log(error));
