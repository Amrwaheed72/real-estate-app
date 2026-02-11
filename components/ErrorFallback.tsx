import { Image, View } from 'react-native';
import Error from '@/assets/images/error.webp';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react-native';
import { Icon } from './ui/icon';
const ErrorFallback = ({ error, refetch }: { error: string; refetch: () => void }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-96 w-96">
        <Image source={Error} resizeMode="contain" className="h-full w-full" />
      </View>
      <View className="gap-5">
        <Text className="font-rubik-bold" numberOfLines={1}>
          Error occurred while loading the data
        </Text>
        <Text className="font-rubik-semibold text-center text-xs text-red-500" numberOfLines={1}>
          {error}
        </Text>
        <Button
          variant={null}
          className="border border-black/20 bg-gray-50 transition-colors active:bg-gray-100 dark:border-white/20 dark:bg-blue-950/20 dark:active:bg-blue-950/40"
          onPress={refetch}>
          <Text>Try again</Text>
          <Icon as={RefreshCcw} />
        </Button>
      </View>
    </View>
  );
};

export default ErrorFallback;
