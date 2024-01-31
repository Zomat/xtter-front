import axios from "axios";
import { config } from "../../config";
import { Post } from "./DashboardService";

export default class PostService {
  constructor(
    private baseUrl: string = config['BACKEND_URL'],
  ) {}

  async create(content: string): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/post`,
        {
          'content': content
        },
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error during creating content:', error);
      return null;
    }
  }

  async like(id: string): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/post/like`,
        {
          'postId': id
        },
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error during liking:', error);
      return null;
    }
  }

  async unlike(id: string): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/post/unlike`,
        {
          'postId': id 
        },
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error during liking:', error);
      return null;
    }
  }

  async comment(postId: string, content: string): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/post/comment`,
        {
          'postId': postId,
          'content': content,
        },
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error during commenting:', error);
      return null;
    }
  }

  async share(postId: string, content: string): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/post/share`,
        {
          'postId': postId,
          'content': content,
        },
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error during sharing:', error);
      return null;
    }
  }

  async getPost(postId: string): Promise<Post | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/post/${postId}`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data as Post;
    } catch (error) {
      console.error('Error during getting post:', error);
      return null;
    }
  }
}