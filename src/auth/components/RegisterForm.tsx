import { useState, FormEvent } from 'react';
import FormInput from '../../shared/components/FormInput';
import AuthService, { IAuthErrorResponse } from '../services/AuthService';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  nick: string;
  bio: string;
}

export const RegisterForm = () => {
  const authService: AuthService = new AuthService();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    nick: '',
    bio: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some(value => value === '')) {
      setError('Fill all fields');

      setFormData((prevData) => ({ ...prevData, password: '', password_confirmation: '' }));
      
      setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }
    
    const result = await authService.register(formData);

    if (result instanceof Object && 'error' in result) {
      const { message } = result as IAuthErrorResponse;
      console.log(message);
      setError(message);
      setFormData((prevData) => ({ ...prevData, password: '', password_confirmation: '' }));
    } else if (result === true) {
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nick: '',
        bio: '',
      });
      setMsg("Account created!");
    } else {
      setError('Unexpected register result');
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div className="p-6">
    <h2 className="text-2xl mb-4">Create Account</h2>
    <form onSubmit={handleSubmit}>
      {error && (<div className={`text-red-500 mb-8 text-left transition-all h-6`}>{error}</div>)}
      {msg && (<div className={`text-green-500 mb-8 text-left transition-all h-6`}>{msg}</div>)}
      <div className="mb-4">
        <FormInput 
        type="name"
        label="name"
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="email"
        label="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="password"
        label="password"
        value={formData.password}
        onChange={(value) => handleInputChange('password', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="password"
        label="Confirm password"
        value={formData.password_confirmation}
        onChange={(value) => handleInputChange('password_confirmation', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="nick"
        label="nick"
        value={formData.nick}
        onChange={(value) => handleInputChange('nick', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="bio"
        label="bio"
        value={formData.bio}
        onChange={(value) => handleInputChange('bio', value)}
        />
      </div>
      <button
        className="flex items-center justify-center text-xl bg-transparent font-main border w-full mt-8 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:border-violet-800 focus:outline-none transition space-x-4"
        type="submit"
      >
        Create
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>
    </form>
  </div>
  );
};

export default RegisterForm;
