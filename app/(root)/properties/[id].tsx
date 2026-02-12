import ErrorFallback from '@/components/ErrorFallback';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import useGetAgent from '@/hooks/useGetAgent';
import useGetPropertyDetails from '@/hooks/useGetPropertyDetails';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Send } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGetReviews from '@/hooks/useGetReviews';
import PropertyInfo from '@/components/PropertyInfo';
import AgentInfo from '@/components/AgentInfo';
import ReviewsSection from '@/components/ReviewsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import LocationSection from '@/components/LocationSection';
import BookingSection from '@/components/BookingSection';

const propertyImages = [
  {
    url: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: 1,
  },
  {
    url: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: 2,
  },
  {
    url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: 3,
  },
  {
    url: 'https://images.unsplash.com/photo-1720432972486-2d53db5badf0?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: 4,
  },
];

const Property = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useLocalSearchParams();
  const { data, isPending, error, refetch } = useGetPropertyDetails(id as string);
  const {
    isPending: isLoadingAgent,
    error: errorAgent,
    refetch: refetchAgent,
  } = useGetAgent(data?.agent as string);
  const {
    data: reviewsData,
    isPending: isLoadingReview,
    error: errorReview,
    refetch: refetchReview,
  } = useGetReviews(data?.$id!, 2);
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;
  if (error) return <ErrorFallback error={error.message} refetch={refetch} />;
  if (errorAgent) return <ErrorFallback error={errorAgent.message} refetch={refetchAgent} />;
  if (errorReview) return <ErrorFallback error={errorReview.message} refetch={refetchReview} />;
  if (isPending || isLoadingAgent || isLoadingReview) return <Spinner variant="ring" size="lg" />;

  const { address, price, rating, facilities } = data!;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
        <View className="relative h-72">
          <View className="absolute top-3 z-50 w-full flex-row justify-between px-5">
            <Icon as={ArrowLeft} size={25} onPress={() => router.back()} color={'white'} />
            <View className="flex-row items-center gap-2">
              <Icon as={Heart} size={25} color={'white'} />
              <Icon as={Send} size={25} color={'white'} />
            </View>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={propertyImages}
            keyExtractor={(item) => item.id.toString()}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            onViewableItemsChanged={onViewableItemsChanged}
            pagingEnabled
            snapToAlignment="center"
            renderItem={({ item }) => (
              <View className="h-72 w-screen px-2">
                <Image
                  source={{ uri: item.url }}
                  className="size-full rounded-2xl"
                  contentFit="cover"
                  transition={1000}
                  cachePolicy="memory-disk"
                />
              </View>
            )}
          />
          <View className="absolute bottom-5 w-full flex-row justify-center gap-3">
            {propertyImages.map((_, i) => (
              <View
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-blue-400' : 'w-2.5 bg-white'}`}
              />
            ))}
          </View>
        </View>
        <View className="p-5">
          <View className="gap-4">
            <PropertyInfo id={id as string} reviewDataLength={reviewsData?.length!} />
            <AgentInfo agentId={data?.agent!} />
            <FacilitiesSection facilities={facilities} />
            {/* Location */}
            <LocationSection address={address} />
            {/* reviews */}
            <ReviewsSection id={id as string} rating={rating} />
          </View>
        </View>
      </ScrollView>
      <BookingSection price={price} />
    </SafeAreaView>
  );
};

export default Property;
