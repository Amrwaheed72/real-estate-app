import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
export { ErrorBoundary } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouteGuard from '@/components/RouteGuard';
import { cssInterop } from "nativewind";
import { Image } from "expo-image";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
cssInterop(Image, {
  className: 'style',
});
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'rubik-bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'rubik-extraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'rubik-light': require('../assets/fonts/Rubik-Light.ttf'),
    'rubik-medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'rubik-semiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
    'rubik-regular': require('../assets/fonts/Rubik-Regular.ttf'),
  });
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <RouteGuard>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }} />
          <PortalHost />
        </ThemeProvider>
      </QueryClientProvider>
    </RouteGuard>
  );
}
