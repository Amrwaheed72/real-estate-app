import ErrorFallback from '@/components/ErrorFallback';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import useGetAgent from '@/hooks/useGetAgent';
import useGetPropertyDetails from '@/hooks/useGetPropertyDetails';
import { facilitiesIconMapping, getCoordinates } from '@/lib/helpers';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import {
  ArrowDown,
  ArrowLeft,
  Bed,
  Heart,
  LucideIcon,
  MessageCircle,
  Phone,
  Send,
  Share,
  SquareDashed,
  Star,
  ThumbsDown,
  ThumbsUp,
  Toilet,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGetReviews from '@/hooks/useGetReviews';
import { Button } from '@/components/ui/button';

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
    data: agentData,
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

  const {
    bedrooms,
    type,
    name,
    description,
    address,
    price,
    rating,
    area,
    bathrooms,
    facilities,
    geolocation,
    gallery,
  } = data!;
  const { name: agentName, email, avatar, $id: agentId } = agentData!;
  const testCoords = {
    latitude: 40.785091,
    longitude: -73.968285,
  };
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
            {/* property info */}
            <View className="gap-4">
              <Text className="text-xl font-bold">{name}</Text>
              <View className="flex-row gap-6 px-2">
                <Text className="font-rubik-extraBold text-blue-600/80">{type}</Text>
                <View className="flex-row items-center gap-2">
                  <Icon as={Star} size={18} className="text-yellow-400" strokeWidth={3} />
                  <Text className="font-rubik-medium">{rating}</Text>
                  <Text className="text-gray-500 dark:text-gray-400">
                    ({reviewsData?.length} reviews)
                  </Text>
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
            {/*  agent info */}
            <View className="mt-10 gap-2">
              <Text className="text-xl font-bold">{agentName}</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-5">
                  <Image source={{ uri: avatar }} className="size-14 rounded-full" />
                  <View>
                    <Text className="font-rubik-bold">{agentName}</Text>
                    <Text className="font-rubik-medium text-gray-400">Owner</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-4">
                  <Icon as={MessageCircle} size={24} className="text-gray-400" />
                  <Icon as={Phone} size={24} className="text-gray-400" />
                </View>
              </View>
            </View>
            {/* overview */}
            <View className="mt-5 gap-2">
              <Text className="text-xl font-bold">Overview</Text>
              <Text className="text-gray-400">{description}</Text>
            </View>
            {/* Facilities */}
            <View className="mt-5 gap-4">
              <Text className="text-xl font-bold">Facilities</Text>
              <View className="w-full flex-row flex-wrap">
                {facilities.map((one) => {
                  const icon = facilitiesIconMapping(one) as LucideIcon;
                  return (
                    <View key={one} className="mb-4 w-[84px] items-center justify-center gap-2">
                      <Icon as={icon} className="text-blue-500" size={30} />
                      <Text className="text-xs">{one}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
            {/* Location */}
            <View className="mt-2 gap-4">
              <Text className="text-xl font-bold">Location</Text>
              <Text className="text-xl font-bold">{address}</Text>
              <Text className="mb-3 font-rubik-bold text-xl">Location</Text>

              <View className="h-52 w-full overflow-hidden rounded-2xl border border-gray-200">
                <MapView
                  style={{ width: '100%', height: '100%' }}
                  initialRegion={{
                    latitude: testCoords.latitude,
                    longitude: testCoords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <Marker coordinate={testCoords} title="Test Property" />
                </MapView>
              </View>
            </View>
            {/* reviews */}
            <View className="mt-5 gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-between gap-2">
                  <Icon as={Star} size={26} className="text-yellow-400" strokeWidth={3} />
                  <Text className="font-rubik-medium text-xl">{rating}</Text>
                  <Text className="font-rubik-medium text-xl">({reviewsData?.length} reviews)</Text>
                </View>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-base text-blue-400">See All</Text>
                </TouchableOpacity>
              </View>
              <View className="gap-4">
                {reviewsData?.map((review, i) => (
                  <View
                    key={review.$id}
                    className={`gap-4 py-4 ${reviewsData.length - 1 === i ? '' : 'border-b border-black/40 dark:border-white/40'}`}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <Image source={{ uri: review.avatar }} className="size-12 rounded-full" />
                        <Text className="mb-1 font-rubik-medium text-gray-800 dark:text-gray-200">
                          {review.name}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-1">
                        <Icon as={Star} size={16} className="text-yellow-400" strokeWidth={3} />
                        <Text className="font-rubik-medium">{review.rating}</Text>
                      </View>
                    </View>
                    <Text className="text-gray-400">{review.review}</Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-4">
                        <Icon as={ThumbsUp} size={18} />
                        <Icon as={ThumbsDown} size={18} />
                      </View>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(review.$createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 h-36 w-full rounded-tl-2xl rounded-tr-2xl bg-gray-200 dark:bg-gray-800">
        <View className="flex-1 flex-row items-center justify-between px-12 pb-12">
          <View className="gap-2">
            <Text className="text-xs text-gray-500 dark:text-gray-400">Price</Text>
            <Text className="font-rubik-bold text-xl text-blue-500 dark:text-blue-400">
              ${price}
            </Text>
          </View>
          <Button
            variant={null}
            size={'lg'}
            className="w-48 rounded-md bg-blue-600 transition-colors active:bg-blue-700 dark:border-gray-200/20">
            <Text className="text-white font-rubik-medium">Book Now</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Property;
