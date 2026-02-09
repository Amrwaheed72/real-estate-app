import { TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  classNames?: string;
  disabled?: boolean;
  children?: ReactNode;
}
const SettingItem = ({
  icon,
  title,
  onPress,
  showArrow = true,
  classNames,
  disabled = false,
  children,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center gap-3">
        <Icon as={icon} size={22} className={cn('', classNames)} />
        <Text
          className={cn('font-rubik-medium text-lg text-black/60 dark:text-white/60', classNames)}>
          {title}
        </Text>
        {children}
      </View>
      {showArrow && <Icon as={ChevronRight} size={18} className={cn('', classNames)} />}
    </TouchableOpacity>
  );
};

export default SettingItem;
