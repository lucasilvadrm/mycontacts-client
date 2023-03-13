export default class APIError extends Error {
  constructor(response, body) {
    super(); // executando o método constutor da classe que está sendo herdada
    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
