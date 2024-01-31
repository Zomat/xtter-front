import axios from 'axios';
import { config } from '../../config';
import { HomeFeed } from '../../dashboard/services/DashboardService';
import { UpdateProfileFormData } from '../components/UpdateProfileForm';

export interface IUserProfile {
  userId: string;
  profileId: string;
  nick: string;
  bio: string;
  picturePath?: string;
  followsAuthUser: boolean | null;
  followedByAuthUser: boolean | null;
}

export interface IUserErrorResponse {
  error: number;
  message: string;
}

export default class UserService {
  constructor(
    private baseUrl: string = config['BACKEND_URL'],
  ) {}

  async getProfile(id: string | undefined): Promise<IUserProfile | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/user/profile/${id}`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return response.data as IUserProfile;
    } catch (error) {
      console.error('Error during getting user profile:', error);
      return null;
    }
  }

  async getProfileFeed(id: string | undefined): Promise<HomeFeed | null | boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/user/profile/${id}/feed`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      return response.data as HomeFeed;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        return false;
      } else {
        console.error('Error during getting user profile feed:', error);
        return null;
      }
    }
  }

  async follow(id: string | undefined): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/user/follow`,
        {
          userId: id
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
      console.error('Error during follow:', error);
      return null;
    }
  }

  async unfollow(id: string | undefined): Promise<boolean | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/user/unfollow`,
        {
          userId: id
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
      console.error('Error during unfollow:', error);
      return null;
    }
  }

  async updateProfile({ ...data }: UpdateProfileFormData): Promise<boolean | IUserErrorResponse | null> {
    try {
      await axios.post(
        `${this.baseUrl}/api/user/edit-profile`,
        data,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 422) {
        const msg: string = error.response.data.message;
        const err: number = error.response.status;
       
        return { error: err, message: msg } as IUserErrorResponse;
      } else {
        console.error('Error during register:', error);
        return null;
      }
    }
  }
}