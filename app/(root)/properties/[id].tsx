import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Property {id}</Text>
    </View>
  );
};

export default Property;
