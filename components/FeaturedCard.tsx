import images from '@/constants/images';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { Star } from 'lucide-react-native';
import { Text } from './ui/text';
interface Props {
  onPress?: () => void;
}
const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className="relative h-80 w-60 items-start">
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image source={images.cardGradient} className="absolute bottom-0 size-full rounded-2xl" />
      <View className="absolute right-5 top-5 flex-row items-center rounded-full bg-white/80 px-3 py-1.5">
        <Icon as={Star} size={16} className="text-yellow-500" />
        <Text className="ml-1 font-rubik-bold text-xs text-blue-600">4.4</Text>
      </View>
      <View className="absolute inset-x-5 bottom-5 items-start">
        <Text className="font-rubik-extraBold text-xl text-white" numberOfLines={1}>
          Modern apartment
        </Text>
        <Text></Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
