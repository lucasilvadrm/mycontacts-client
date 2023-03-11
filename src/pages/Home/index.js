import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  InputSearchContainer,
  Card,
  Container, Header, ListHeader,
} from './styles';

import Loader from '../../components/Loader';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { delay } from '../../utils/delay';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line max-len
  const filteredContacts = useMemo(
    () => contacts.filter(({ name }) => (name.toLowerCase().includes(searchTerm.toLowerCase()))),
    [contacts, searchTerm],
  );

  useEffect(() => {
    (async function loadContacts() {
      try {
        setLoading(true);
        await delay(1000);
        const data = await (await fetch(`http://localhost:3333/contacts?orderBy=${orderBy}`)).json();
        setContacts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    }());
  }, [orderBy]);

  const handleToggleOrderBy = () => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Loader isLoading={loading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar contato..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
      <ListHeader order={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>
            Nome
          </span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

export default Home;
