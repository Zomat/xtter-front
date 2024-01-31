import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/services/AuthService';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogout = () => {
    authService.logout();
    navigate('/welcome');
  };

  return (
    <div className='flex items-start flex-col ml-96 text-white h-screen bg-[#262626]'>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button className="rounded shadow-xl p-2 hover:bg-violet-500 bg-[#191919]" onClick={handleLogout}>Logout</button>
    </div>
  );
};
