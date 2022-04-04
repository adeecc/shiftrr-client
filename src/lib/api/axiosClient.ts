import axios, { AxiosRequestConfig } from 'axios';

const baseClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Expose-Headers': 'authorization',
    'Content-Type': 'application/json',
  },
});

const resolver = async (config: AxiosRequestConfig) => {
  const response = await baseClient.request(config).catch((error) => {
    console.error('Whoops! ', error);
    return null;
  });

  if (response) {
    console.log(response);
    console.log('Succesful Request!');
  }

  return response?.data;
};

export const client = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    return await resolver({
      ...config,
      url,
      method: 'get',
    });
  },
  post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    return await resolver({
      ...config,
      url,
      data,
      method: 'post',
    });
  },
  put: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    return await resolver({
      ...config,
      url,
      data,
      method: 'put',
    });
  },
  delete: async (url: string, config?: AxiosRequestConfig) => {
    return await resolver({
      ...config,
      url,
      method: 'delete',
    });
  },
};
