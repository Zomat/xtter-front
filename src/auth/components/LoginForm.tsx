import { useState, FormEvent, useContext } from 'react';
import FormInput from '../../shared/components/FormInput';
import AuthService, { IAuthErrorResponse } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { IUserContext, UserContext } from '../context/UserContext';

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const authService: AuthService = new AuthService();
  const { setUser} = useContext<IUserContext>(UserContext);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Fill all fields');

      setFormData((prevData) => ({ ...prevData, password: '' }));
      
      setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }
    
    const loginResult = await authService.login(formData.email, formData.password);

    if (loginResult instanceof Object && 'error' in loginResult) {
      const { message } = loginResult as IAuthErrorResponse;
      console.log(message);
      setError(message);
      setFormData((prevData) => ({ ...prevData, password: '' }));
    } else if (loginResult instanceof Object && 'message' in loginResult) {
      console.log('login');
      setUser({ email: "EMAIL", nick: "NICK"});
      navigate('/'); 
    } else {
      setError('Unexpected login result');
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div className="p-6">
    <h2 className="text-2xl mb-4">Log In</h2>
    <form onSubmit={handleSubmit}>
      {<div className={`text-red-500 mb-4 text-left transition-all h-6`}>{error}</div>}
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
      <button
        className="flex items-center justify-center text-xl bg-transparent font-main border w-full mt-8 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:border-violet-800 focus:outline-none transition space-x-4"
        type="submit"
      >
        LogIn 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>
    </form>
  </div>
  );
};

export default LoginForm;
