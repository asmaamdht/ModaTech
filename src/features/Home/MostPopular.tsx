import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { fetchProducts } from '@/src/redux/Slice/productSlice';
import { MostPopularProps } from '@/src/types/components/home';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRouter } from 'expo-router';
import { ROUTES } from '@/src/constants/Routes';
import { t } from 'i18next';

const MostPopular: React.FC<MostPopularProps> = ({ onPressItem, isRTL }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const router =useRouter();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

 const allowedCategories = ["electronics", "jewelery", "men's clothing"];
 const filteredProducts = products.filter(
    (product) => allowedCategories.includes(product.category.toLowerCase())
  );

  // Sort by rating (most popular first)
  const sortedData = [...filteredProducts].sort((a, b) => {
    const ratingA = a.rating?.rate || 0;
    const ratingB = b.rating?.rate || 0;
    return ratingB - ratingA;
  }).slice(0,4);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.error }]}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>{t(`mostPopular`)}</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.wrapper]}>
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: colors.card },
                isRTL && styles.cardRTL,
              ]}
              activeOpacity={0.8}
              onPress={() => onPressItem?.(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={[styles.image, { backgroundColor: colors.card }]}
                resizeMode="contain"
              />

              <View style={styles.content}>
                <View style={[styles.ageTag,{backgroundColor:colors.primary}]}>
                  <Text style={[styles.ageText,{color:colors.background}]}>{item.category}</Text>
                </View>

                <Text 
                  style={[styles.name, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {item.title.split(" ").slice(0,3).join(" ")}
                </Text>

                <View style={styles.ratingRow}>
                  {Array.from({ length: Math.floor(item.rating?.rate || 0) }).map((_, i) => (
                    <Text key={i} style={[styles.star]}>★</Text>
                  ))}
                </View>

                <Text style={[styles.seller, { color: colors.textSecondary }]}>
                  {item.rating?.count || 0} reviews
                </Text>

              <View style={{flexDirection:"row" , justifyContent:"space-between" ,alignItems:"center"}}>
                  <Text style={[styles.price, { color: colors.primary }]}>
                    ${item.price.toFixed(2)}
                  </Text>
                
                  <View 
                    style={[styles.cartView,{ backgroundColor: colors.primary },isRTL && styles.cartViewRTL]}>
                    <TouchableOpacity
                      onPress={() => router.push(ROUTES.CART as any)}
                      style={styles.cartIcon}
                    >
                      <Svg width="25" height="25" viewBox="0 0 25 25" fill={colors.headerView}>
                        <Path fill={colors.headerView} d="M4.63839 15.6152C5.28099 15.6152 5.80389 16.1494 5.80389 16.8071C5.80389 17.4648 5.28099 18 4.63839 18C3.99579 18 3.47378 17.4648 3.47378 16.8071C3.47378 16.1494 3.99579 15.6152 4.63839 15.6152ZM14.7907 15.6152C15.4342 15.6152 15.9571 16.1494 15.9571 16.8071C15.9571 17.4648 15.4342 18 14.7907 18C14.1481 18 13.6261 17.4648 13.6261 16.8071C13.6261 16.1494 14.1481 15.6152 14.7907 15.6152ZM0.790154 0.00873895L2.66216 0.340351C2.96366 0.394699 3.19316 0.650777 3.21926 0.963967L3.43076 3.5441L4.21723 3.54444C4.34557 3.5445 4.47255 3.54456 4.59818 3.54462L6.04206 3.54532C6.15715 3.54538 6.27096 3.54544 6.38349 3.5455L7.97775 3.54639C8.0779 3.54645 8.17686 3.54651 8.27463 3.54657L9.39183 3.5473C9.48034 3.54736 9.56772 3.54742 9.65398 3.54748L10.6366 3.54823C10.7142 3.54829 10.7907 3.54835 10.8662 3.54841L11.723 3.54917C11.7904 3.54923 11.8568 3.54929 11.9222 3.54936L12.4853 3.54993C12.545 3.54999 12.6039 3.55006 12.6618 3.55012L13.3139 3.5509C13.3647 3.55096 13.4147 3.55103 13.4639 3.55109L14.0145 3.55188C14.0572 3.55194 14.0991 3.55201 14.1402 3.55208L14.4902 3.55267C14.5268 3.55274 14.5628 3.55281 14.598 3.55288L14.9878 3.55368C15.0176 3.55375 15.0468 3.55382 15.0753 3.55389L15.3152 3.5545C15.34 3.55457 15.3643 3.55464 15.3879 3.55471L15.6451 3.55554C15.6644 3.55561 15.6832 3.55568 15.7014 3.55575L15.8524 3.55638C15.8678 3.55645 15.8827 3.55652 15.8971 3.55659L16.0498 3.55744C16.0609 3.55751 16.0716 3.55758 16.082 3.55765L16.1652 3.5583C16.1734 3.55837 16.1813 3.55845 16.1889 3.55852L16.2488 3.55917C16.2546 3.55925 16.2601 3.55932 16.2654 3.55939L16.3062 3.56005C16.31 3.56013 16.3137 3.5602 16.3171 3.56027L16.3429 3.56094C16.3452 3.56102 16.3474 3.56109 16.3495 3.56117L16.3682 3.56207C16.3693 3.56214 16.3704 3.56222 16.3714 3.5623C16.3801 3.56313 16.3814 3.56329 16.3827 3.56344C16.884 3.63805 17.325 3.90611 17.6256 4.31878C17.9262 4.73053 18.0522 5.23808 17.9802 5.74655L17.1261 11.7874C16.965 12.937 15.9894 13.8038 14.8554 13.8038H5.02647C3.84117 13.8038 2.83766 12.8569 2.74136 11.6456L1.91696 1.61061L0.560653 1.37111C0.192551 1.30479 -0.0531497 0.948307 0.00985059 0.571559C0.0746508 0.19481 0.430152 -0.0502144 0.790154 0.00873895ZM4.03668 4.92613L3.54416 4.92581L4.08687 11.5323C4.12647 12.0407 4.53237 12.4221 5.02827 12.4221H14.8536C15.3225 12.4221 15.723 12.0647 15.7896 11.5903L16.6446 5.54851C16.6644 5.40481 16.6293 5.26111 16.5438 5.14505C16.4592 5.02806 16.335 4.95253 16.1946 4.93226C16.1881 4.93252 16.1726 4.93275 16.1484 4.93296L16.0505 4.93353C16.0301 4.93362 16.0075 4.9337 15.983 4.93377L15.4732 4.93457C15.4302 4.9346 15.3854 4.93463 15.339 4.93465L14.1403 4.9346C14.0734 4.93457 14.0052 4.93454 13.9358 4.93451L12.5677 4.93366C12.4858 4.9336 12.4029 4.93354 12.3192 4.93347L11.5451 4.93284C11.4569 4.93276 11.3681 4.93268 11.2786 4.93261L10.4587 4.93187C10.3661 4.93178 10.273 4.9317 10.1796 4.93161L9.61474 4.93108C9.51997 4.93099 9.42493 4.9309 9.32966 4.93081L8.46772 4.92998C8.37161 4.92989 8.27545 4.9298 8.17928 4.92971L7.6027 4.92916C7.50674 4.92907 7.4109 4.92898 7.31522 4.92889L6.74353 4.92836C6.64872 4.92827 6.55419 4.92818 6.45998 4.9281L5.62252 4.92736C5.53079 4.92728 5.43955 4.9272 5.34886 4.92713L4.29053 4.92631C4.20512 4.92624 4.12049 4.92618 4.03668 4.92613ZM13.4081 6.94893C13.7807 6.94893 14.0831 7.25843 14.0831 7.63978C14.0831 8.02114 13.7807 8.33064 13.4081 8.33064H10.9133C10.5398 8.33064 10.2383 8.02114 10.2383 7.63978C10.2383 7.25843 10.5398 6.94893 10.9133 6.94893H13.4081Z" />
                      </Svg>
                    </TouchableOpacity>
                  </View>
              </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MostPopular;

const styles = StyleSheet.create({
  container: { 
    marginTop: 20,
    paddingHorizontal: 16,   
    marginBottom: 10
  },

  headerRow: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  wrapper: { overflow: 'visible' },
  card: {
    width: wp(45),
    borderRadius: 12,
    marginRight: wp(3),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },

  cardRTL: {
    marginRight: 0,
    marginLeft: wp(3),
  },

  image: {
    width: '100%',
    height: hp(21), 
    marginTop: 5,
  },

  content: {
    padding: wp(3),
  },

  ageTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: hp(0.5),
  },
  ageText: { fontSize: 12, fontWeight: '700' },

  name: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginBottom: hp(1),
  },

  ratingRow: { flexDirection: 'row', marginVertical: 4 },
  star: { color: '#ffb400', fontSize: 16 },

  seller: { fontSize: 14, marginBottom: hp(0.5) },

  price: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },

  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
    cartView: {
      borderColor: "transparent",
      borderWidth: 1,
      borderRadius: 10,
      width: 40,
      marginRight: 10,
      marginLeft: 0,
      height: 40,
      alignItems: "center",
      justifyContent: "center"
    } as ViewStyle,
    cartViewRTL: {
      marginRight: 0,
      marginLeft: 10,
    } as ViewStyle,
    cartIcon: {
    position: 'relative',
    marginTop: 5,
    marginLeft: 3,
  } as ViewStyle,
});