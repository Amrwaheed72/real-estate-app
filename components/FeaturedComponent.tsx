import { Image } from 'expo-image';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { Bell } from 'lucide-react-native';
import { Icon } from './ui/icon';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import Empty from './Empty';
import Filters from './Filters';
import { useAuth } from '@/store/useAuth';
import { PropertiesCollection } from '@/types/apiTypes';
import FeaturedCard from './FeaturedCard';
import useGetLatestProperties from '@/hooks/useGetLatestProperties';
import ErrorFallback from './ErrorFallback';
import FeaturedPropertiesSkeleton from '@/skeletons/FeaturedPropertiesSkeleton';
import { Skeleton } from './ui/skeleton';

const featuredCardRenderItem = ({ item }: { item: PropertiesCollection }) => (
  <FeaturedCard item={item} />
);

const FeaturedComponent = () => {
  const { data, isPending, error, refetch } = useGetLatestProperties();

  const user = useAuth((state) => state.user);
  const { avatar, name } = user!;

  if (error) return <ErrorFallback error={error?.message!} refetch={refetch} />;
  if (isPending) return <FeaturedPropertiesSkeleton />;
  return (
    <View className="px-5">
      <View className="mt-5 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={{ uri: avatar }}
            className="size-12 rounded-full"
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <View className="ml-2 items-start justify-center">
            <Text className="font-rubik text-xs text-gray-600 dark:text-gray-400">Welcome</Text>
            <Text className="font-rubik-medium text-base">{name}</Text>
          </View>
        </View>
        <Icon as={Bell} size={24} />
        <ThemeToggle />
      </View>
      <Search />
      <View className="my-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-rubik-bold text-xl">Featured</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text className="font-rubik-bold text-base text-blue-400">See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          horizontal
          bounces={false}
          contentContainerClassName="gap-5 mt-5"
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Empty />}
          renderItem={featuredCardRenderItem}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-rubik-bold text-xl">Our Recommendation</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text className="font-rubik-bold text-base text-blue-400">See All</Text>
        </TouchableOpacity>
      </View>
      <Filters />
    </View>
  );
};

export default FeaturedComponent;
