import { Image } from 'expo-image';
import { View } from 'react-native';
import { Text } from './ui/text';
import { Icon } from './ui/icon';
import { MessageCircle, Phone } from 'lucide-react-native';
import useGetAgent from '@/hooks/useGetAgent';

const AgentInfo = ({ agentId }: { agentId: string }) => {
  const { data } = useGetAgent(agentId as string);
  const { name: agentName, avatar } = data!;

  return (
    <View className="mt-6 gap-2">
      <Text className="text-xl font-bold">{agentName}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-5">
          <Image source={{ uri: avatar }} className="size-14 rounded-full" />
          <View>
            <Text className="font-rubik-bold">{agentName}</Text>
            <Text className="font-rubik-medium text-gray-400">Owner</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <Icon as={MessageCircle} size={24} className="text-gray-400" />
          <Icon as={Phone} size={24} className="text-gray-400" />
        </View>
      </View>
    </View>
  );
};

export default AgentInfo;
