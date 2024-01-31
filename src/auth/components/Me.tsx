import { useEffect, useState } from "react";
import UserService, { IUserProfile } from "../../user/services/UserService";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

export const Me = () => {
  const userService = new UserService();
  const navigate = useNavigate();
  const [me, setMe] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getProfile('me');
        if (! data) {
          return;
        }
        setMe(data);
      } catch (error) {
        console.error('Error during fetching me:', error);
      }
    };
    fetchData();
  }, []);

  const handleGoToUserProfile = (id: string) => {
    navigate('/profile/'+id);
  }

  return (
    <div>
      { me && (
      <div className="flex items-center mb-4 mt-4 bg-[#191919] p-6 rounded shadow-xl">
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-center items-center">
            {me.picturePath ? (
              <img
                src={`${config.BACKEND_URL}/${me.picturePath}`}
                alt={`${me.nick}'s profile picture`}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <img
                src={config.PROFILE_PICTURE_PLACEHOLDER}
                alt={`${me.nick}'s profile picture`}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) }
            <h2 className="text-lg font-bold cursor-pointer hover:text-violet-500 transition" onClick={() => handleGoToUserProfile(me.profileId)}>@{me.nick}</h2>
          </div>
          <div onClick={() => navigate('/update-profile')} className="hover:scale-110 hover:rotate-45 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}