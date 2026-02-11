import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { categories } from '@/constants/data';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      router.setParams({ filter: 'All' });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-0 mt-3 rounded-md bg-gray-100 py-3 dark:bg-gray-900">
      {categories.map((item) => (
        <TouchableOpacity
          activeOpacity={1}
          className={`${item.category === selectedCategory && 'bg-blue-700'} mx-2 rounded-md px-4 py-2`}
          onPress={() => handleCategoryPress(item.category)}
          key={item.title}>
          <Text className={`${item.category === selectedCategory && 'text-white'}`}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
