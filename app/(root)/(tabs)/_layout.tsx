import { Tabs } from 'expo-router';
import { Home, Search, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const TabsLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: colorScheme === 'light' ? '#0061ff6A' : '#ffffffb7',
        tabBarInactiveTintColor: '#8d8d8d8A',
        headerShadowVisible: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: '#0061ff2A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
