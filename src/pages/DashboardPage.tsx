import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardService, { HomeFeed } from '../dashboard/services/DashboardService';
import { Post as PostComponent } from '../dashboard/components/Post';
import SharedPost from '../dashboard/components/SharedPost';
import CreatePostForm from '../dashboard/components/CreatePostForm';
import SearchProfile from '../dashboard/components/SearchProfile';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState<HomeFeed | null>(null);
  const dashboardService = new DashboardService();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      navigate('/welcome');
    } else {
      const fetchData = async () => {
        try {
          const feedData = await dashboardService.getFeed();
          if (feedData === false) {
            navigate('/welcome');
          } else {
            setFeed(feedData);
          }
        } catch (error) {
          console.error('Error during fetching feed:', error);
        }
      };
      fetchData();
    }
  }, []);

  if (!feed) {
    return (<div>...</div>)
  }
  
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#262626] mt-24">
      <div className='w-1/2 px-12'>
        <SearchProfile />
      </div>
      <div className='w-1/2 px-12'>
        <CreatePostForm />
      </div>
      <div className='px-12 w-1/2'>
        {feed && feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index}>
              {item && item.hasOwnProperty('shareId') ? (
                <div>
                  <SharedPost sharedPost={item}/>
                </div>
              ) : (
                <div>
                  <PostComponent post={item}/>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-white'>No content to display</p>
        )}
      </div>
      </div>
  );
};