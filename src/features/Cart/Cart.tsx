import CartItem from '@/src/components/CartItem';
import { useTheme } from '@/src/contexts/ThemeContext';
import { fetchCart } from '@/src/redux/Slice/cartSlice';
import { fetchProducts } from '@/src/redux/Slice/productSlice';
import { AppDispatch, RootState } from '@/src/redux/store';
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, loading: cartLoading } = useSelector((state: RootState) => state.cart);
  const { products, loading: productsLoading } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(fetchProducts()).unwrap().then(() => {
      dispatch(fetchCart());
    });
  }, [dispatch]);

  const loading = cartLoading || productsLoading;


  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.iconContainer, { backgroundColor: colors.headerView }]}>
          <Ionicons name={"arrow-back-outline"} color={colors.primary} size={24} />
        </View>
        <Text style={[styles.headerText, { color: colors.text }]}>Cart</Text>
        <View style={{ width: wp("8") }} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        cartItems.map(cart => (
          <CartItem
            key={cart.id}
            cart={cart}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    height: hp("4"),
    width: wp("8"),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
