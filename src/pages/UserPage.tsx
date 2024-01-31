import { useNavigate, useParams } from "react-router-dom";
import UserService, { IUserProfile } from "../user/services/UserService";
import { FormEvent, useEffect, useState } from "react";
import { HomeFeed } from "../dashboard/services/DashboardService";
import SharedPost from "../dashboard/components/SharedPost";
import Post from "../dashboard/components/Post";
import { config } from "../config";

export const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams<string>();
  const userService = new UserService();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [feed, setFeed] = useState<HomeFeed | null | boolean>(null);
  const [follow, setFollow] = useState<null | boolean>(null);

  const profilePicturePath = profile?.picturePath 
          ? config.BACKEND_URL+'/'+profile?.picturePath
          : config.PROFILE_PICTURE_PLACEHOLDER;

  useEffect(() => {
    if (! userId) {
      navigate('/');
    }
    
    const fetchData = async () => {
      try {
        const profileData = await userService.getProfile(userId);
        const feedData = await userService.getProfileFeed(userId);
        if (! profileData) {
          navigate('/');
        }

        setProfile(profileData);
        setFollow(profileData?.followedByAuthUser ? true : false)

        if (feedData) {
          setFeed(feedData);
        }
      } catch (error) {
        console.error('Error during fetching feed:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleFollow = async () => {
    if (follow) {
      userService.unfollow(profile?.userId);
      setFollow(!follow);
    } else {
      userService.follow(profile?.userId);
      setFollow(!follow);
    }
  }

  const handleLogin = async () => {
    navigate('/welcome');
  }

  if (! profile) {
    return <div>...</div>
  }

  return (
    <div className="flex items-start justify-center w-full min-h-screen bg-[#262626]">
      <div className="flex flex-col items-center w-full mt-12">
      <div className="px-12 w-1/2">
        <div className="mb-4 mt-4 bg-[#191919] p-6 rounded shadow-xl">
          <div className="flex items-center mb-2">
            <img
                src={profilePicturePath}
                alt={`${profile.nick}'s profile picture`}
                className="w-24 h-24 rounded-full mr-2"
            />
          </div>
            <h2 className="text-2xl font-bold text-white">@{profile.nick}</h2>
            <p className="text-white">{profile.bio}</p>
            { localStorage.getItem('authToken') && (
            <button className="text-white hover:scale-105 transition p-2 rounded shadow-xl mt-4 bg-[#262626]"
            onClick={handleFollow}>
              {follow ? (
                "unfollow"
              ) : (
                "follow"
              )}
            </button>
            )}
        </div>
      </div>
        <h3 className="text-xl font-bold text-white mb-2">User's Posts</h3>
      <div className='px-12 w-1/2'>
      {feed !== null && feed !== false ? (
        feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index}>
              {item && item.hasOwnProperty('shareId') ? (
                <div>
                  <SharedPost sharedPost={item} />
                </div>
              ) : (
                <div>
                  <Post post={item} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No content to display</p>
        )
      ) : (
        <button onClick={handleLogin}>Login to see content</button>
      )}
      </div>
      </div>
    </div>
  )
}