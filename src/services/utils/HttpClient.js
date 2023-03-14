import APIError from '../../errors/apiError';
import { delay } from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(1000);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type'); // pegando o tipo do content-type

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) { // range 200-299
      return body;
    }

    // colocando a responsabilidade de exibir o erro na chamada a API
    throw new APIError(response, body);
  }

  async post(path, body) {
    await delay(500);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type'); // pegando o tipo do content-type

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) { // range 200-299
      return responseBody;
    }

    // colocando a responsabilidade de exibir o erro na chamada a API
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
