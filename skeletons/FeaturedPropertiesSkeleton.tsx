import { Skeleton } from '@/components/ui/skeleton';
import { View } from 'react-native';

const FeaturedPropertiesSkeleton = () => {
  return (
    <View className="flex-1">
      <View className="mt-5 flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <View className="ml-2 gap-1">
            <Skeleton className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          </View>
        </View>
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      </View>
      <View className="mt-5 px-5">
        <Skeleton className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </View>
      <View className="my-5 px-5">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-700" />
        </View>
        <View className="flex-row gap-5 overflow-hidden">
          <Skeleton className="h-64 w-52 rounded-2xl bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-64 w-52 rounded-2xl bg-gray-200 dark:bg-gray-700" />
        </View>
      </View>
      <View className="mb-4 flex-row items-center justify-between px-5">
        <Skeleton className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-700" />
      </View>
      <View className="mb-5 flex-row gap-3 px-5">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-10 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        ))}
      </View>
      <View className="px-5">
        <View className="flex-row gap-4">
          <Skeleton className="h-52 flex-1 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-52 flex-1 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </View>
      </View>
    </View>
  );
};

export default FeaturedPropertiesSkeleton;
