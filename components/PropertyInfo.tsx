import { View } from 'react-native';
import { Text } from './ui/text';
import { Icon } from './ui/icon';
import { Bed, SquareDashed, Star, Toilet } from 'lucide-react-native';
import useGetPropertyDetails from '@/hooks/useGetPropertyDetails';

interface Prop {
  id: string;
  reviewDataLength: number;
}
const PropertyInfo = ({ id, reviewDataLength }: Prop) => {
  const { data } = useGetPropertyDetails(id);
  const { name, type, rating, bedrooms, bathrooms, area, description } = data!;
  return (
    <>
      <View className="gap-4">
        <Text className="text-xl font-bold">{name}</Text>
        <View className="flex-row gap-6 px-2">
          <Text className="font-rubik-extraBold text-blue-600/80">{type}</Text>
          <View className="flex-row items-center gap-2">
            <Icon as={Star} size={18} className="text-yellow-400" strokeWidth={3} />
            <Text className="font-rubik-medium">{rating}</Text>
            <Text className="text-gray-500 dark:text-gray-400">({reviewDataLength} reviews)</Text>
          </View>
        </View>
        <View className="mt-2 flex-row items-center justify-between px-2">
          <View className="flex-row items-center gap-2">
            <Icon as={Bed} size={22} className="text-blue-500" />
            <Text className="font-rubik-medium text-sm">{bedrooms} Beds</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon as={Toilet} size={22} className="text-blue-500" />
            <Text className="font-rubik-medium text-sm">{bathrooms} Bathrooms</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon as={SquareDashed} size={22} className="text-blue-500" />
            <Text className="font-rubik-medium text-sm">{area} Sqft</Text>
          </View>
        </View>
      </View>
      <View className="mt-5 gap-2">
        <Text className="text-xl font-bold">Overview</Text>
        <Text className="text-gray-400">{description}</Text>
      </View>
    </>
  );
};

export default PropertyInfo;
