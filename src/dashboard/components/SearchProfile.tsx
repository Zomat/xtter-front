import { ChangeEvent, FormEvent, useState } from "react";
import DashboardService from "../services/DashboardService";
import { IUserProfile } from "../../user/services/UserService";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

export const SearchProfile = () => {
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<IUserProfile[] | null>(null);
  const dashboardService = new DashboardService();

  const handleSearch = async(e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      return;
    }

    const result = await dashboardService.searchProfile(content);
    if (result !== false) {
      setProfiles(result);
      setContent('');
    }
  }

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
  };

  const handleGoToUserProfile = (id: string) => {
    navigate('/profile/'+id);
  }

  return (
    <div className="bg-[#191919] rounded shadow-xl p-6 mb-4 text-white w-full">
      <h2 className="font-bold text-xl">Search profiles</h2>
      <form className="flex items-center justify-center mt-2" onSubmit={handleSearch}>
        <input 
        value={content}
        onChange={handleContentChange}
        placeholder="Search profile..."
        className="h-full w-11/12 border rounded-md py-2 px-3 bg-transparent focus:bg-transparent focus:outline-none" />
        <button
        className="flex ml-2 h-full items-center justify-center bg-[#262626] font-main w-1/12 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:scale-105 focus:outline-none transition"
        type="submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>
      {profiles &&
        profiles.map((profile) => (
          <div
            className="shadow-xl rounded p-2 w-full bg-[#262626] mb-2 border-b mt-4"
            key={profile.profileId}
          >
            <div className="flex items-center mb-2">
            {profile.picturePath ? (
                <img
                  src={`${config.BACKEND_URL}/${profile.picturePath}`}
                  alt={`${profile.nick}'s profile picture`}
                  className="w-6 h-6 rounded-full mr-2"
                />
              ) : (
                <img
                  src={config.PROFILE_PICTURE_PLACEHOLDER}
                  alt={`${profile.nick}'s profile picture`}
                  className="w-6 h-6 rounded-full mr-2"
                />
              ) }
            <h2 className="text-lg font-bold cursor-pointer hover:text-violet-500 transition" onClick={() => handleGoToUserProfile(profile.profileId)}>@{profile.nick}</h2>
          </div>
          </div>
        ))}

    </div>
  );
};

export default SearchProfile;