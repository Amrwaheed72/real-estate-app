import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useMarkFavorite from './useMarkFavorite';
import * as Burnt from 'burnt';

export const useLocalFavorite = (is_favorite: boolean, id: string) => {
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const { mutate } = useMarkFavorite();
  const queryClient = useQueryClient();
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  useEffect(() => {
    setIsFavorite(is_favorite);
  }, [is_favorite]);

  const handleToggleMarked = (e: any) => {
    e.stopPropagation();
    toggleFavorite();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    mutate(
      { id: id, data: { is_favorite: nextState } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['all-properties'] });
          queryClient.invalidateQueries({ queryKey: ['property'] });
          Burnt.toast({
            title: `${nextState ? 'Added from Favorites' : 'Removed from Favorites'} `,
          });
        },
        onError: (error) => {
          Burnt.toast({
            title: error.message,
          });
        },
      }
    );
  };
  return { isFavorite, toggleFavorite, handleToggleMarked };
};
