import { useState, FormEvent, useContext } from 'react';
import FormInput from '../../shared/components/FormInput';
import { useNavigate } from 'react-router-dom';
import UserService, { IUserErrorResponse } from '../services/UserService';

export interface UpdateProfileFormData {
  nick?: string | null;
  bio?: string | null;
  picture?: File | null;
}

export const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const userService = new UserService();

  const [formData, setFormData] = useState<UpdateProfileFormData>({
    nick: null,
    bio: null,
    picture: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
      
    setTimeout(() => {
      setError(null);
    }, 3000);
    
    const result = await userService.updateProfile(formData);

    if (result instanceof Object && 'error' in result) {
      const { message } = result as IUserErrorResponse;
      console.log(message);
      setError(message);
      setFormData((prevData) => ({ ...prevData, password: '' }));
    } else if (result === true) {
      console.log('updated');
      setMsg('Success');
    } else {
      setError('Unexpected login result');
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({ ...prevData, picture: file }));
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div className="p-6 shadow-xl rounded bg-[#191919]">
    <h2 className="text-2xl mb-4 text-white">Update profile data</h2>
    <form onSubmit={handleSubmit}>
      {error && (<div className={`text-red-500 mb-8 text-left transition-all h-6`}>{error}</div>)}
      {msg && (<div className={`text-green-500 mb-8 text-left transition-all h-6`}>{msg}</div>)}
      <div className="mb-4">
        <FormInput 
        type="nick"
        label="nick"
        value={formData.nick ?? ''}
        onChange={(value) => handleInputChange('nick', value)}
        />
      </div>
      <div className="mb-4">
        <FormInput 
        type="bio"
        label="bio"
        value={formData.bio ?? ''}
        onChange={(value) => handleInputChange('bio', value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="profilePicture" className="text-white text-sm uppercase mb-2 text-left">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={(e) => handlePictureChange(e)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        className="flex items-center justify-center text-xl bg-transparent font-main border w-full mt-8 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:border-violet-800 focus:outline-none transition space-x-4"
        type="submit"
      >
        Update
      </button>
    </form>
  </div>
  );
};

export default UpdateProfileForm;
