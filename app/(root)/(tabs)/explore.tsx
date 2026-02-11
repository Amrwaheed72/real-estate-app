import NormalCard from '@/components/NormalCard';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorFallback from '@/components/ErrorFallback';
import Empty from '@/components/Empty';
import { router, useLocalSearchParams } from 'expo-router';
import useGetAllProperties from '@/hooks/useGetAllProperties';
import { PropertiesCollection } from '@/types/apiTypes';
import { Skeleton } from '@/components/ui/skeleton';
import Search from '@/components/Search';
import { Text } from '@/components/ui/text';
import Filters from '@/components/Filters';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Bell } from 'lucide-react-native';
import ExploreCard from '@/components/ExploreCard';

const Explore = () => {
  const params = useLocalSearchParams<{ query: string; filter?: string }>();
  const { data, isPending, error, refetch } = useGetAllProperties(params.filter!, params.query, 20);

  if (error) return <ErrorFallback error={error?.message!} refetch={refetch} />;
  const loadingData = [1, 2, 3, 4, 5, 6, 7, 8] as any;
  return (
    // this for displaying a skeleton that matches the displayed cards
    <SafeAreaView className="flex-1">
      <FlatList
        data={isPending ? loadingData : data}
        keyExtractor={(item, index) =>
          isPending ? index.toString() : (item as PropertiesCollection).$id
        }
        contentContainerClassName="pb-32"
        ListEmptyComponent={!isPending ? <Empty /> : null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="mt-5 flex-row items-center justify-between">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.back()}
                className="size-11 flex-row items-center justify-center rounded-full bg-blue-500/20">
                <Icon as={ArrowLeft} size={20} />
              </TouchableOpacity>
              <Text className="mr-2 text-center font-rubik-medium text-base">
                Search For Your Ideal Home
              </Text>
              <Icon as={Bell} size={20} />
            </View>
            <Search />
            <Filters />
            <View className="mt-5">
              <Text className="mt-5 font-rubik-bold text-xl">Fount {data?.length} Properties</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          if (isPending) {
            return (
              <View className="mb-2 mt-4 h-52 w-full flex-1 rounded-lg">
                <Skeleton className="h-full w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </View>
            );
          }
          return <ExploreCard item={item as PropertiesCollection} />;
        }}
      />
    </SafeAreaView>
  );
};

export default Explore;
