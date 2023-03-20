import APIError from '../../errors/apiError';
import { delay } from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
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
