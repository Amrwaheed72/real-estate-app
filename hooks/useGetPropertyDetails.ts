import { getPropertyDetails } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetPropertyDetails = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyDetails(id),
  });
  return { data, isPending, error, refetch };
};

export default useGetPropertyDetails;
