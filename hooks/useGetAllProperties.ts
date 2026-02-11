import { getProperties } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllProperties = (filter: string, query: string, limit?: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['all-properties', filter, query, limit],
    queryFn: () => getProperties(filter, query, limit),
  });
  return { data, isPending, error, refetch };
};

export default useGetAllProperties;
