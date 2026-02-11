import { getLatestProperties } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetLatestProperties = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['latest-properties'],
    queryFn: getLatestProperties,
  });
  return { data, isPending, error, refetch };
};

export default useGetLatestProperties;
