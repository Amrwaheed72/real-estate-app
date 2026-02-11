import { PropertiesCollection } from '@/types/apiTypes';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { Heart, Star } from 'lucide-react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from './ui/text';

const ExploreCard = ({ item }: { item: PropertiesCollection }) => {
  const { name, type, price, rating, address, image, $id } = item;
  const imagePlaceholder = image.replace('w=640', 'w=50').replace('q=60', 'q=1');

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={() => handleCardPress($id)}
      activeOpacity={0.8}
      className="relative mt-4 max-w-full flex-1 flex-row justify-between rounded-lg bg-white px-3 py-4 shadow-lg shadow-black dark:bg-gray-800">
      <View className="relative flex-row">
        <View className="absolute right-1 top-1 z-50 flex-row items-center rounded-full bg-white/80 px-2 py-1">
          <Icon as={Star} size={14} className="text-yellow-500" />
          <Text className="ml-0.5 font-rubik-bold text-xs text-blue-600">{rating}</Text>
        </View>
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          transition={1000}
          placeholder={{ uri: imagePlaceholder }}
          source={{ uri: image }}
          className="size-32 rounded-lg"
          allowDownscaling
        />
      </View>
      <View className="mt-2 max-w-44 justify-evenly">
        <Text className="font-rubik-extraBold text-base" numberOfLines={3}>
          {name}
        </Text>
        <Text className="font-rubik text-sm text-black/80 dark:text-white/80" numberOfLines={3}>
          {address}
        </Text>
      </View>
      <View className="mt-2 items-center justify-between">
        <Icon as={Heart} size={18} className="text-black dark:text-white" />
        <Text className="font-rubik-bold text-base text-blue-400 dark:text-blue-300">${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCard;
