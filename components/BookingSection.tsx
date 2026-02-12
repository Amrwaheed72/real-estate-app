import { View } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';

const BookingSection = ({ price }: { price: number }) => {
  return (
    <View className="absolute bottom-0 left-0 h-36 w-full rounded-tl-2xl rounded-tr-2xl bg-gray-200 dark:bg-gray-800">
      <View className="flex-1 flex-row items-center justify-between px-12 pb-12">
        <View className="gap-2">
          <Text className="text-xs text-gray-500 dark:text-gray-400">Price</Text>
          <Text className="font-rubik-bold text-xl text-blue-500 dark:text-blue-400">${price}</Text>
        </View>
        <Button
          variant={null}
          size={'lg'}
          className="w-48 rounded-md bg-blue-600 transition-colors active:bg-blue-700 dark:border-gray-200/20">
          <Text className="font-rubik-medium text-white">Book Now</Text>
        </Button>
      </View>
    </View>
  );
};

export default BookingSection;
