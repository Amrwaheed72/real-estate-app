import { markFavorite } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

const useMarkFavorite = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { is_favorite: boolean } }) =>
      markFavorite(id, data),
  });
  return { mutate, isPending };
};

export default useMarkFavorite;
