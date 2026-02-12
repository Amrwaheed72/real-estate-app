import NormalCard from '@/components/NormalCard';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorFallback from '@/components/ErrorFallback';
import Empty from '@/components/Empty';
import { useLocalSearchParams } from 'expo-router';
import useGetAllProperties from '@/hooks/useGetAllProperties';
import { PropertiesCollection } from '@/types/apiTypes';
import FeaturedComponent from '@/components/FeaturedComponent';
import { Skeleton } from '@/components/ui/skeleton';

export default function Screen() {
  const params = useLocalSearchParams<{ query: string; filter?: string }>();
  const { data, isPending, error, refetch } = useGetAllProperties(params.filter!, params.query, 6);

  if (error) return <ErrorFallback error={error?.message!} refetch={refetch} />;

  const loadingData = [1, 2, 3, 4] as any;
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={isPending ? loadingData : data}
        keyExtractor={(item, index) =>
          isPending ? index.toString() : (item as PropertiesCollection).$id
        }
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="gap-4 px-4"
        ListEmptyComponent={!isPending ? <Empty /> : null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={FeaturedComponent}
        renderItem={({ item }) => {
          if (isPending) {
            return (
              <View className="mb-2 mt-4 h-52 w-full flex-1 rounded-lg">
                <Skeleton className="h-full w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </View>
            );
          }
          return <NormalCard item={item as PropertiesCollection} />;
        }}
      />
    </SafeAreaView>

    // this for displaying a skeleton that wraps thw whole app
    // <SafeAreaView className="flex-1">
    //   <FlatList
    //     data={data}
    //     keyExtractor={(item) => item.$id}
    //     numColumns={2}
    //     contentContainerClassName="pb-32"
    //     columnWrapperClassName="gap-4 px-4"
    //     ListEmptyComponent={!isPending ? <Empty /> : null}
    //     showsVerticalScrollIndicator={false}
    //     ListHeaderComponent={FeaturedComponent}
    //     renderItem={({ item }) => {
    //       return <NormalCard item={item as PropertiesCollection} />;
    //     }}
    //   />
    // </SafeAreaView>
    // this for displaying a skeleton that matches the displayed cards

    // this for displaying a spinner
    // <SafeAreaView className="flex-1">
    //   <FlatList
    //     data={data}
    //     keyExtractor={(item, index) =>
    //       isPending ? index.toString() : (item as PropertiesCollection).$id
    //     }
    //     numColumns={2}
    //     contentContainerClassName="pb-32"
    //     columnWrapperClassName="gap-4 px-4"
    //     ListEmptyComponent={
    //       isPending ? (
    //         <View className="mb-2 mt-4 h-52 w-full flex-1 rounded-lg">
    //           <Skeleton className="h-full w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
    //         </View>
    //       ) : (
    //         <Empty />
    //       )
    //     }
    //     showsVerticalScrollIndicator={false}
    //     ListHeaderComponent={FeaturedComponent}
    //     renderItem={({ item }) => {
    //       return <NormalCard item={item as PropertiesCollection} />;
    //     }}
    //   />
    // </SafeAreaView>
  );
}
