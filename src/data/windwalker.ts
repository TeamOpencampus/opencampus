import ky from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

export interface Result<T> {
  data: T;
}

type TokenResponse = { token: string; refresh_token: string };

class WindWalker {
  private client: KyInstance;
  constructor(prefixUrl: string) {
    this.client = ky.extend({
      prefixUrl,
      headers: { 'content-type': 'application/json' },
    });
  }

  login = (email: string, password: string) =>
    this.client
      .post('login', { body: JSON.stringify({ email, password }) })
      .json<Result<TokenResponse>>();

  register = (email: string, password: string) =>
    this.client
      .post('register', { body: JSON.stringify({ email, password }) })
      .json<Result<TokenResponse>>();
}

export default new WindWalker(import.meta.env.VITE_API_URL ?? '/v1');
