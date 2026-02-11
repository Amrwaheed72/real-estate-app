import { TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { Heart, Star } from 'lucide-react-native';
import { Text } from './ui/text';
import { PropertiesCollection } from '@/types/apiTypes';
import { Image } from 'expo-image';
import { memo } from 'react';
import { router } from 'expo-router';

interface Props {
  item: PropertiesCollection;
}
const NormalCard = memo(({ item }: Props) => {
  const { name, rating, image, address, price, $id } = item;

  const imagePlaceholder = image.replace('w=640', 'w=50').replace('q=60', 'q=1');

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={() => handleCardPress($id)}
      activeOpacity={0.8}
      className="relative mt-4 w-full flex-1 rounded-lg bg-white px-3 py-4 shadow-lg shadow-black dark:bg-gray-800">
      <View className="absolute right-5 top-5 z-50 flex-row items-center rounded-full bg-white/80 px-2 py-1">
        <Icon as={Star} size={14} className="text-yellow-500" />
        <Text className="ml-0.5 font-rubik-bold text-xs text-blue-600">{rating}</Text>
      </View>
      <Image
        cachePolicy="memory-disk"
        contentFit="cover"
        transition={1000}
        placeholder={{ uri: imagePlaceholder }}
        source={{ uri: image }}
        className="h-40 w-full rounded-lg"
        allowDownscaling
      />
      <View className="mt-2">
        <Text className="font-rubik-bold text-base">{name}</Text>
        <Text className="font-rubik text-xs text-black/80 dark:text-white/80">{address}</Text>
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-rubik-bold text-base text-blue-400 dark:text-blue-300">
            ${price}
          </Text>
          <Icon as={Heart} size={18} className="text-black dark:text-white" />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default NormalCard;
