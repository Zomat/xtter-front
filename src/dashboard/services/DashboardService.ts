import axios from "axios";
import { config } from "../../config";
import { IUserProfile } from "../../user/services/UserService";

export interface CreatorProfile {
  userId: string;
  profileId: string;
  nick: string;
  bio: string;
  picturePath?: string;
  followsAuthUser: boolean;
  followedByAuthUser: boolean;
}

export interface Comment {
  content: string;
  createdAt: string;
  creatorNick: string;
  creatorProfileId: string;
  creatorPicturePath: string;
}

export interface Post {
  id: string;
  creatorProfile: CreatorProfile;
  content: string;
  createdAt: string;
  likesCount: number;
  likedByAuthUser: boolean;
  comments: Comment[];
  commentsCount: number;
  sharesCount: number;
}

export interface Share {
  shareId: string;
  post: Post;
  content: string;
  sharerNick: string;
  sharerPicturePath?: string;
  sharerProfileId: string;
}

export interface HomeFeed {
  data: (Post[] | Share[])[];
}

export interface ITrend {
  id: string;
  name: string;
  count: number;
}

export default class DashboardService {
  constructor(
    private baseUrl: string = config['BACKEND_URL'],
  ) {}

  async getFeed(): Promise<HomeFeed | null | boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/feed`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      const feed = response.data;
      return feed as HomeFeed;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        return false;
      } else {
        console.error('Error during login:', error);
        return null;
      }
    }
  }

  async searchProfile(term: string): Promise<IUserProfile[] | null | boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/search-profile/${term}`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      const res = response.data;
     
      return res as IUserProfile[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        return false;
      } else {
        console.error('Error during login:', error);
        return null;
      }
    }
  }

  async getTrends(): Promise<ITrend[] | null | boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/trends`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      const trends = response.data;
      
      return trends as ITrend[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        return false;
      } else {
        console.error('Error during getting trends:', error);
        return null;
      }
    }
  }
}