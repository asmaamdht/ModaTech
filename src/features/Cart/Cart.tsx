import CartItem from '@/src/components/CartItem';
import PaymentDetails from '@/src/components/PaymentDetails';
import { ROUTES } from '@/src/constants/Routes';
import { useTheme } from '@/src/contexts/ThemeContext';
import { RootState } from '@/src/redux/store';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux';

const Cart = () => {
  const { colors } = useTheme();
  const { cartItems, loading: cartLoading , error} = useSelector((state: RootState) => state.cart);
  const navigation : any = useNavigation();

  const loading = cartLoading ;


  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.STACK,{screen: ROUTES.HOME})}>
          <View style={[styles.iconContainer, { backgroundColor: colors.headerView }]}>
          <Ionicons name={"arrow-back-outline"} color={colors.primary} size={24} />
        </View>
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: colors.text }]}>Cart</Text>
        <View style={{ width: wp("8") }} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <>
        {cartItems.map(cart => (
          <CartItem
            key={cart.id}
            cart={cart}
          />
        ))}
        <PaymentDetails/>
        </>
      )}
      {!loading && error && (
        <Text style={{ marginTop: 20, color: 'red' }}>{error}</Text>
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
