import { TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { Text } from './ui/text';
import { Image } from 'expo-image';
import useGetReviews from '@/hooks/useGetReviews';

const ReviewsSection = ({ id, rating }: { id: string; rating: number }) => {
  const {
    data: reviewsData,
    isPending: isLoadingReview,
    error: errorReview,
    refetch: refetchReview,
  } = useGetReviews(id, 2);
  return (
    <View className="mt-5 gap-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center justify-between gap-2">
          <Icon as={Star} size={26} className="text-yellow-400" strokeWidth={3} />
          <Text className="font-rubik-medium text-xl">{rating}</Text>
          <Text className="font-rubik-medium text-xl">({reviewsData?.length} reviews)</Text>
        </View>
        <TouchableOpacity>
          <Text className="font-rubik-bold text-base text-blue-400">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="gap-4">
        {reviewsData?.map((review, i) => (
          <View
            key={review.$id}
            className={`gap-4 py-4 ${reviewsData.length - 1 === i ? '' : 'border-b border-black/40 dark:border-white/40'}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: review.avatar }} className="size-12 rounded-full" />
                <Text className="mb-1 font-rubik-medium text-gray-800 dark:text-gray-200">
                  {review.name}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Icon as={Star} size={16} className="text-yellow-400" strokeWidth={3} />
                <Text className="font-rubik-medium">{review.rating}</Text>
              </View>
            </View>
            <Text className="text-gray-400">{review.review}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <Icon as={ThumbsUp} size={18} />
                <Icon as={ThumbsDown} size={18} />
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(review.$createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReviewsSection;
