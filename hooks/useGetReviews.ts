import { getReviews } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetReviews = (id: string, limit?: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['reviews', id, limit],
    queryFn: () => getReviews(id, limit),
  });
  return { data, isPending, error, refetch };
};

export default useGetReviews;
