import SettingItem from '@/components/SettingItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { settings } from '@/constants/data';
import { useAuth } from '@/store/useAuth';
import { Redirect } from 'expo-router';
import { Bell, Calendar, Edit, LogOut, Wallet } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Burnt from 'burnt';
import { Spinner } from '@/components/ui/spinner';
import ThemeToggle from '@/components/ThemeToggle';
const profile = () => {
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const isLoggingOut = useAuth((state) => state.isLoggingOut);

  if (!user) return <Redirect href={'/'} />;
  const { name, $id, email, avatar } = user;
  const handleLogout = async () => {
    try {
      await logout();
      Burnt.toast({
        title: 'Logged out',
      });
    } catch (error) {
      Burnt.alert({
        title: error as string,
      });
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerClassName="pb-32 px-7" showsVerticalScrollIndicator={false}>
        <View className="mt-5 flex-row items-center justify-between">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <View className="flex-row items-center gap-2">
            <ThemeToggle />
            <Icon as={Bell} size={20} />
          </View>
        </View>
        <View className="mt-5 flex-row justify-center">
          <View className="relative mt-5 items-center">
            <Avatar
              alt={name}
              className="size-44 border-2 border-background web:border-0 web:ring-2 web:ring-background">
              <AvatarImage source={{ uri: avatar }} />
              <AvatarFallback>
                <Text>{name}</Text>
              </AvatarFallback>
            </Avatar>
            <Button variant={null} className="absolute bottom-9 right-0">
              <Icon as={Edit} size={28} className="text-black dark:text-white" />
            </Button>
            <Text className="mt-2 font-rubik-bold text-2xl">{name}</Text>
          </View>
        </View>
        <View className="mt-10">
          <SettingItem
            icon={Calendar}
            title="My Bookings"
            classNames="text-black/60 dark:text-white/60"
          />
          <SettingItem
            icon={Wallet}
            title="My Payments"
            classNames="text-black/60 dark:text-white/60"
          />
        </View>
        <View className="mt-5 border-t border-primary pt-5">
          {settings.slice(2).map((item) => (
            <SettingItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              classNames="text-black/60 dark:text-white/60"
            />
          ))}
        </View>
        <View className="mt-5 border-t border-primary pt-5">
          <SettingItem
            title="Logout"
            icon={LogOut}
            classNames="text-red-500/80 dark:text-red-500 relative"
            showArrow={false}
            onPress={handleLogout}
            disabled={isLoggingOut}>
            {isLoggingOut && <Spinner variant="ring" size="sm" className="border-t-red-500" />}
          </SettingItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
