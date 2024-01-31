import { useEffect, useState } from "react";
import { LoginForm } from "../auth/components/LoginForm"
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from "../auth/components/RegisterForm";

export const HomePage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#262626]">
      <div className="flex flex-col md:flex-row justify-center w-full items-center text-center text-white">
        <div className="w-full md:w-1/2 md:h-screen flex flex-col items-center justify-center px-24 mb-24">
          <div>
            <h1 className="font-major font-bold text-[128px] md:text-left">Xtter</h1>
            <p className="text-xl md:text-left">
              Miminalist social media platform
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:h-screen flex flex-col items-center justify-center px-24">
         
          <div className="mt-4 w-full">
          { login ? (
            <>
              <LoginForm />
              <button onClick={() => setLogin(false)}>New Account</button>
            </>
          ) : (
            <>
              <RegisterForm />
              <button onClick={() => setLogin(true)}>login</button>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}