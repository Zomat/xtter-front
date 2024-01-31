import { ChangeEvent, FormEvent, useState } from "react";
import { config } from "../../config";
import { Comment, Post as PostModel } from "../services/DashboardService";
import PostService from "../services/PostService";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: PostModel;
}

export const Post = ({ post }: PostProps) => {
  const navigate = useNavigate();
  const postService = new PostService()
  const [isLiked, setIsLiked] = useState<boolean>(post.likedByAuthUser);
  const [likeCounter, setLikeCounter] = useState<number>(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState<string>('');
  const [newShare, setNewShare] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const profilePicturePath = post.creatorProfile.picturePath 
    ? config.BACKEND_URL+'/'+post.creatorProfile.picturePath
    : config.PROFILE_PICTURE_PLACEHOLDER;

  const handleToggleComments = () => {
    if (comments.length > 0) {
      setShowComments(!showComments);
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewComment(newValue);
  };

  const handleShareChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewShare(newValue);
  };

  const handleLikePost = async () => {
    try {
      if (!isLiked) {
        await postService.like(post.id);
        setLikeCounter(likeCounter+1);
        setIsLiked(isLiked);
      } else {
        await postService.unlike(post.id);
        setLikeCounter(likeCounter-1);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Error handling like/unlike:', error);
    }
  };

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();

    if (!newComment) {
      return;
    }

    await postService.comment(post.id, newComment);

    try {
      const updatedPost = await postService.getPost(post.id);
      if (updatedPost) {
        setComments(updatedPost.comments);
      }
  
      setNewComment('');
    } catch (error) {
      console.error('Error handling comment:', error);
    }
  };

  const handleShare = async (e: FormEvent) => {
    e.preventDefault();

    if (!newShare) {
      return;
    }

    await postService.share(post.id, newShare);
    setNewShare('');
  };

  const handleGoToUserProfile = () => {
    navigate('/profile/'+post.creatorProfile.profileId);
  }

  return (
    <div className="p-6 mb-4 text-white bg-[#191919] rounded shadow-xl">
      <div className="flex items-center mb-2">
        <img
            src={profilePicturePath}
            alt={`${post.creatorProfile.nick}'s profile picture`}
            className="w-8 h-8 rounded-full mr-2"
        />
        <h2 className="text-lg font-bold cursor-pointer hover:text-violet-500 transition" onClick={handleGoToUserProfile}>@{post.creatorProfile.nick}</h2>
        <span className="ml-8">{post.createdAt}</span>
      </div>
      <p className="text-white mt-4 mb-4">{post.content}</p>
      <div className="flex items-center mt-2">
        <button 
        onClick={handleLikePost}
        className={`flex text-white hover:bg-violet-500 transition rounded py-1 px-3 mr-4 ${isLiked ? 'bg-violet-500' : ' '}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
          </svg>
          <span className="ml-2">{likeCounter}</span>
        </button>
        <button
          onClick={handleToggleComments}
          className="cursor-pointer focus:outline-none"
        >
          {showComments ? 'Hide Comments' : `Comments (${comments.length})`}
        </button>
        </div>
        {showComments && comments.length > 0 && (
        <div className="mt-4 w-full justify-start overflow-y-auto max-h-40">
          <p className="text-gray-600 font-semibold mb-2">Comments ({ comments.length })</p>
          {comments.map((comment: Comment, index: number) => (
            <div key={index} className="border-t border-gray-300 py-2">
              <div className="flex items-center mb-2">
                {comment.creatorPicturePath ? (
                  <img
                    src={`${config.BACKEND_URL}/${comment.creatorPicturePath}`}
                    alt={`${comment.creatorNick}'s profile picture`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) : (
                  <img
                    src={config.PROFILE_PICTURE_PLACEHOLDER}
                    alt={`${comment.creatorNick}'s profile picture`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) }
                
                <p className="font-semibold text-white">@{comment.creatorNick}</p>
              </div>
              <p className="text-white mb-2">{comment.content}</p>
              <p className="text-gray-300 text-xs">{comment.createdAt}</p>
            </div>
          ))}
        </div>
      )}
      <form className="flex items-center justify-center mt-8" onSubmit={handleComment}>
        <input 
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Enter comment..."
        className="h-full w-11/12 border rounded-md py-2 px-3 bg-transparent focus:bg-transparent focus:outline-none" />
        <button
        className="ml-2 h-full items-center justify-center bg-[#262626] font-main w-1/12 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:scale-105 focus:outline-none transition"
        type="submit"
        >
          +
        </button>
      </form>

      <form className="flex items-center justify-center mt-8" onSubmit={handleShare}>
        <input 
        value={newShare}
        onChange={handleShareChange}
        placeholder="Enter share content..."
        className="h-full w-11/12 border rounded-md py-2 px-3 bg-transparent focus:bg-transparent focus:outline-none" />
        <button
        className="ml-2 h-full items-center justify-center bg-[#262626] font-main w-1/12 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:scale-105 focus:outline-none transition"
        type="submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Post;