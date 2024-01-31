import axios from 'axios';
import { config } from '../../config';
import { RegisterFormData } from '../components/RegisterForm';

export interface IAuthSuccessResponse {
  message: string;
}

export interface IAuthErrorResponse {
  error: number;
  message: string;
}

export default class AuthService {
  constructor(
    private baseUrl: string = config['BACKEND_URL'],
  ) {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  async login(email: string, password: string): Promise<IAuthSuccessResponse | IAuthErrorResponse | null> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/login`,
        { email, password },
        {
          headers: config['STD_HEADERS'],
        }
      );
      
      const token = response.data.token;
      this.setToken(token);
      return { message: "Success" } as IAuthSuccessResponse;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        const msg: string = error.response.data.message;
        const err: number = error.response.status;
       
        return { error: err, message: msg } as IAuthErrorResponse;
      } else {
        console.error('Error during login:', error);
        return null;
      }
    }
  }

  async register({ ...data }: RegisterFormData): Promise<boolean | IAuthErrorResponse | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/register`,
        data,
        {
          headers: config['STD_HEADERS'],
        }
      );
      
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 422) {
        const msg: string = error.response.data.message;
        const err: number = error.response.status;
       
        return { error: err, message: msg } as IAuthErrorResponse;
      } else {
        console.error('Error during register:', error);
        return null;
      }
    }
  }
}