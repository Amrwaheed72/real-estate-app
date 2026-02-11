import { getAgent } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetAgent = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => getAgent(id),
  });
  return { data, isPending, error, refetch };
};

export default useGetAgent;
