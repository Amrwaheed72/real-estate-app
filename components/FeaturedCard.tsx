import images from '@/constants/images';
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
const FeaturedCard = memo(({ item }: Props) => {
  const { image, rating, name, price, address, $id } = item;
  const imagePlaceholder = image.replace('q=60', 'q=1').replace('w=640', 'w=50');
  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={() => handleCardPress($id)}
      className="relative h-80 w-60 items-start"
      activeOpacity={0.8}>
      <Image
        source={{ uri: image }}
        cachePolicy="memory-disk"
        placeholder={{ uri: imagePlaceholder }}
        contentFit="cover"
        transition={1000}
        allowDownscaling
        className="size-full rounded-2xl"
      />
      <Image
        source={images.cardGradient}
        cachePolicy="memory-disk"
        contentFit="cover"
        transition={1000}
        allowDownscaling
        className="absolute bottom-0 size-full rounded-2xl"
      />
      <View className="absolute right-5 top-5 z-50 flex-row items-center rounded-full bg-white/80 px-3 py-1.5">
        <Icon as={Star} size={16} className="text-yellow-500" />
        <Text className="ml-1 font-rubik-bold text-xs text-blue-600">{rating}</Text>
      </View>
      <View className="absolute inset-x-5 bottom-5 items-start">
        <Text className="font-rubik-extraBold text-xl text-white" numberOfLines={1}>
          {name}
        </Text>
        <Text className="font-rubik text-xs text-white">{address}</Text>
        <View className="w-full flex-row items-center justify-between">
          <Text className="font-rubik-extraBold text-sm text-white">${price}</Text>
          <Icon as={Heart} size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default FeaturedCard;
