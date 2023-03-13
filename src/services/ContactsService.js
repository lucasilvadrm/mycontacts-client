import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/e7120963-ae8d-4107-a248-85c5234c870b?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
