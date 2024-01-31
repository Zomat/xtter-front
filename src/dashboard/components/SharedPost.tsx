import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { Share } from "../services/DashboardService";
import Post from "./Post";

interface SharedPostProps {
  sharedPost: Share;
}

export const SharedPost = ({ sharedPost }: SharedPostProps) => {
  const navigate = useNavigate();

  const handleGoToUserProfile = () => {
    navigate('/profile/'+sharedPost.sharerProfileId);
  }

  return (
    <div className="bg-[#191919] rounded shadow-xl p-6 mb-4 text-white">
      <div className="mb-4">
        <div className="flex items-center mb-2">
        {sharedPost.sharerPicturePath && (
          <img
            src={`${config.BACKEND_URL}/${sharedPost.sharerPicturePath}`}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        {sharedPost.sharerPicturePath == undefined && (
          <img
            src={`${config.PROFILE_PICTURE_PLACEHOLDER}`}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <h2 className="text-lg font-bold cursor-pointer hover:text-violet-500 transition" onClick={handleGoToUserProfile}>@{sharedPost.sharerNick}</h2>
        </div>
        <div className="flex flex-col">
          <p>{sharedPost.content}</p>
        </div>
      </div>
      <div className="border-l">
        <Post post={sharedPost.post} />
      </div>
    </div>
  );
};

export default SharedPost;