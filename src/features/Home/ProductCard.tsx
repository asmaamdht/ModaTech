import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/contexts/ThemeContext';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ProductCardProps } from '@/src/types/components/home';




const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isRTL }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[  styles.card, {backgroundColor:colors.card}, isRTL && styles.cardRTL,]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.image }}
        style={[styles.image,{backgroundColor:colors.card}]}
        resizeMode="contain"
      />
      <View style={[styles.content, {backgroundColor:colors.card} ,isRTL && styles.contentRTL]}>
        <Text style={[  styles.title,  { color: colors.text },  isRTL && styles.titleRTL,]} numberOfLines={2}>
          {product.title.split(" ").slice(0,3).join(" ")}
        </Text>
        <Text style={[  styles.price,{ color: colors.textLight },isRTL && styles.priceRTL,]}>
          ${product.price}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={[  styles.moreDetail, { color: colors.primary }, isRTL && styles.moreDetailRTL, ]} >
            {t('moreDetail')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(45),
    borderRadius: 12,
    marginRight: wp(3),
    marginBottom: hp(2),
    shadowColor: '#e15184',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  } as ViewStyle,
  cardRTL: {
    marginRight: 0,
    marginLeft: wp(3),
  } as ViewStyle,
  image: {
    width: '100%',
    height: hp(20),
    marginTop:5,
  },
  content: {
    padding: wp(3),
  } as ViewStyle,
  contentRTL: {
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontSize: wp(3.5),
    fontWeight: '600',
    marginBottom: hp(1),
    minHeight: hp(4),
    textAlign: 'center',
  } as TextStyle,
  titleRTL: {
    textAlign: 'center',
  } as TextStyle,
  price: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
    textAlign: 'center',
  } as TextStyle,
  priceRTL: {
    textAlign: 'center',
  } as TextStyle,
  moreDetail: {
    fontSize: wp(3.2),
    marginTop: hp(0.5),
    textDecorationLine: 'underline',
    textAlign: 'center',
  } as TextStyle,
  moreDetailRTL: {
    textAlign: 'center',
  } as TextStyle,
});

export default ProductCard;

