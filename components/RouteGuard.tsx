import { useAuth } from '@/store/useAuth';
import { useRouter, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { Image, View } from 'react-native';
import icon from '@/assets/images/icon.png';
import { SafeAreaView } from 'react-native-safe-area-context';
const RouteGuard = ({ children }: { children: ReactNode }) => {
  const user = useAuth((state) => state.user);
  const loading = useAuth((state) => state.loading);
  const getUser = useAuth((state) => state.getUser);
  const router = useRouter();
  const segment = useSegments();

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (loading) return;
    const isInAuth = segment[0] === 'sign-in';
    if (!user && !isInAuth) router.replace('/sign-in');
    if (user && isInAuth) router.replace('/');
  }, [user, loading, segment, router]);
  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-[#111422]">
  //       <Image source={icon} className="h-48 w-48" resizeMode="contain" />
  //     </SafeAreaView>
  //   );
  // }
  return <>{children}</>;
};

export default RouteGuard;
