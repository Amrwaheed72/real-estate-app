import { View } from 'react-native';
import { Text } from './ui/text';
import MapView, { Marker } from 'react-native-maps';

const LocationSection = ({ address }: { address: string }) => {
  const testCoords = {
    latitude: 40.785091,
    longitude: -73.968285,
  };
  return (
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
  );
};

export default LocationSection;
