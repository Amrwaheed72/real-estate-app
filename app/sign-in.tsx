import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import onboarding from '@/assets/images/onboarding.png';
import Google from '@/assets/icons/google.png';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/useAuth';
import * as Burnt from 'burnt';
const Signin = () => {
  const login = useAuth((state) => state.login);

  const handleLogin = async () => {
    try {
      await login();
      Burnt.toast({
        title: 'Successful Login',
      });
    } catch (error) {
      Burnt.alert({
        title: error as string,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="h-full">
        <Image source={onboarding} className={`h-4/6 w-full`} resizeMode="contain" />
        <View className="px-10">
          <Text className="font-rubik text-center text-base uppercase text-black/60 dark:text-white/60">
            Welcome to Statelify
          </Text>
          <Text className="font-rubik-bold mt-2 text-center text-3xl">
            Let's Get You Closer to {'\n'}
            <Text className="text-3xl text-blue-500">Your Ideal Home</Text>
          </Text>
          <Text className="font-rubik mt-6 text-center text-lg text-black/60 dark:text-white/60">
            Login to Statelify with Google
          </Text>
          <Button
            onPress={handleLogin}
            variant={'outline'}
            className="rounded-full shadow-md shadow-zinc-300 dark:bg-blue-950 dark:shadow-blue-900">
            <Image source={Google} className="h-5 w-5" resizeMode="contain" />
            <Text className="text-gray-700 dark:text-gray-300">Continue with Google</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
