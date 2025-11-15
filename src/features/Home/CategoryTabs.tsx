import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/contexts/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export type Category = 'all' | "electronics" | "jewelery" | "men's clothing";

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  isRTL: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange,
  isRTL,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'electronics', label: t('electronics') },
    { key: 'jewelery', label: t('jewelery') },
    { key: "men's clothing", label: t('mensClothing') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ styles.scrollContent,  isRTL && styles.scrollContentRTL,]}
        style={isRTL && { direction: 'rtl' }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[ styles.tab,
              selectedCategory === category.key && [styles.activeTab, { borderBottomColor: colors.primary },],
            ]}
            onPress={() => onCategoryChange(category.key)}
          >
            <Text
              style={[styles.tabText,{ color: colors.text },
                selectedCategory === category.key && [styles.activeTabText,{ color: colors.primary },],
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  } as ViewStyle,
  scrollContent: {
    paddingHorizontal: wp(4),
    flexDirection: 'row',
  } as ViewStyle,
  scrollContentRTL: {
    flexDirection: 'row-reverse',
  } as ViewStyle,
  tab: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginRight: wp(2),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  } as ViewStyle,
  activeTab: {
    borderBottomWidth: 2,
  } as ViewStyle,
  tabText: {
    fontSize: wp(3.8),
    fontWeight: '500',
  } as TextStyle,
  activeTabText: {
    fontWeight: 'bold',
  } as TextStyle,
});

export default CategoryTabs;

