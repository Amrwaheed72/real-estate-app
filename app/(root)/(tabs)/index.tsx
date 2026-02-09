import FeaturedCard from '@/components/FeaturedCard';
import Search from '@/components/Search';
import ThemeToggle from '@/components/ThemeToggle';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/store/useAuth';
import { Bell } from 'lucide-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  const user = useAuth((state) => state.user);
  const { avatar, name } = user!;
  return (
    <SafeAreaView className="flex-1">
      <Text>Home</Text>
      <ThemeToggle />
      <View className="px-5">
        <View className="mt-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image source={{ uri: avatar }} className="size-12 rounded-full" resizeMode="contain" />
            <View className="ml-2 items-start justify-center">
              <Text className="font-rubik text-xs text-gray-600 dark:text-gray-400">
                Good Morning
              </Text>
              <Text className="font-rubik-medium text-base">{name}</Text>
            </View>
          </View>
          <Icon as={Bell} size={24} />
        </View>
        <Search />
        <View className="my-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-rubik-bold text-xl">Featured</Text>
            <TouchableOpacity>
              <Text className="font-rubik-bold text-base text-blue-400">See All</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FeaturedCard />
      </View>
    </SafeAreaView>
  );
}
