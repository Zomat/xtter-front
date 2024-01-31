import { Share } from "../services/DashboardService";
import { ChangeEvent, FormEvent, useState } from "react";
import PostService from "../services/PostService";

interface CreatePostFormProps {
  sharedPost: Share;
}

export const CreatePostForm = () => {
  const [content, setContent] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const postService = new PostService();

  const handleCreate = async(e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      return;
    }

    const success = await postService.create(content);
    if (success) {
      setMsg('Post added!');
      setTimeout(() => {
        setMsg('');
      }, 3000);
      setContent('');
    }
  }

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
  };

  return (
    <div className="bg-[#191919] rounded shadow-xl p-6 mb-4 text-white w-full">
      <h2 className="font-bold text-xl">New post</h2>
      {msg && (
        <p className="text-green-500">{msg}</p>
      )}
      <form className="flex items-center justify-center mt-2" onSubmit={handleCreate}>
        <input 
        value={content}
        onChange={handleContentChange}
        placeholder="Write something..."
        className="h-full w-11/12 border rounded-md py-2 px-3 bg-transparent focus:bg-transparent focus:outline-none" />
        <button
        className="flex ml-2 h-full items-center justify-center bg-[#262626] font-main w-1/12 text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:scale-105 focus:outline-none transition"
        type="submit"
        >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;