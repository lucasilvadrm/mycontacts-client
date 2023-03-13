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
}

export default HttpClient;
