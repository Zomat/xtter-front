import axios from "axios";
import { config } from "../../config";

export interface INotification {
  id: string;
  type: number;
  content: string;
  sentDate: string;
  read: boolean;
}


export default class NotificationsService {
  constructor(
    private baseUrl: string = config['BACKEND_URL'],
  ) {}

  async get(): Promise<INotification[] | null | boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/api/notifications`,
        {
          headers: {
            ...config['STD_HEADERS'],
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      const notifs = response.data;
      
      return notifs as INotification[];
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
}