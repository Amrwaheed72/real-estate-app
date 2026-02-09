import { TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Icon } from './ui/icon';
import { Filter, SearchIcon } from 'lucide-react-native';
import useDebounce from '@/hooks/useDebounce';
const Search = () => {
  const pathname = usePathname();
  const params = useLocalSearchParams<{ query: string }>();
  console.log(params);
  const [search, setSearch] = useState(params.query);
  const debouncedSearch = useDebounce(search, 1000);
  useEffect(() => {
    router.setParams({ query: debouncedSearch });
  }, [debouncedSearch]);

    const handleSearch = (text: string) => {
      setSearch(text);
    //   debouncedSearch(text);
    };
  return (
    <View className="mt-5 w-full flex-row items-center justify-between rounded-lg border border-blue-400/40 px-4 py-1 transition-colors focus:border-blue-400">
      <View className="z-50 flex-1 flex-row items-center justify-start">
        <Icon as={SearchIcon} size={20} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="ml-2 flex-1 font-rubik text-xs text-black dark:text-white dark:placeholder:text-white"
        />
      </View>
      <TouchableOpacity>
        <Icon as={Filter} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
