import { useSelector } from 'react-redux';

export const useApiKey = () => {
  const { apikey } = useSelector((state) => state);
  return apikey;
};

export const useUser = () => {
  const apikey = useApiKey();
  return apikey?.user;
};
