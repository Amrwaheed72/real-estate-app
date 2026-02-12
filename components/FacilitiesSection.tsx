import { View } from 'react-native';
import { Text } from './ui/text';
import { Icon } from './ui/icon';
import { facilitiesIconMapping } from '@/lib/helpers';
import { LucideIcon } from 'lucide-react-native';
import { Facility } from '@/types/apiTypes';

const FacilitiesSection = ({ facilities }: { facilities: Facility[] }) => {
  return (
    <View className="mt-5 gap-4">
      <Text className="text-xl font-bold">Facilities</Text>
      <View className="w-full flex-row flex-wrap">
        {facilities.map((one) => {
          const icon = facilitiesIconMapping(one) as LucideIcon;
          return (
            <View key={one} className="mb-4 w-[84px] items-center justify-center gap-2">
              <Icon as={icon} className="text-blue-500" size={30} />
              <Text className="text-xs">{one}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FacilitiesSection;
