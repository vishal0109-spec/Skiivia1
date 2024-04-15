import axios, { AxiosResponse } from 'axios';
import { baseUrl } from './api';

// Define interface for the response data
interface ApiResponse<T> {
  data: T;
}

export class ApiConfig {
  // get
  async getJSON<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get<ApiResponse<T>>(baseUrl + url, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  // post
  async postJSON<T>(url: string, params: T): Promise<T> {
    try {
      const body: string = JSON.stringify(params);
      const response: AxiosResponse<ApiResponse<T>> = await axios.post<ApiResponse<T>>(baseUrl + url, body, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      console.log('ERROR', url, params, error);
      throw error;
    }
  }
}
