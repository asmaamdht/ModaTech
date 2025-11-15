import CartItem from '@/src/components/CartItem';
import { useTheme } from '@/src/contexts/ThemeContext';
import { ICart } from '@/src/types/components/cart';
import { Product } from '@/src/types/components/home';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Cart = () => {
  const { colors } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const productsRes = await fetch('https://fakestoreapi.com/products');
      const productsData: Product[] = await productsRes.json();
      setProducts(productsData);

      const cartRes = await fetch('https://fakestoreapi.com/carts/1'); 
      const cartData = await cartRes.json();

      const mappedCart: ICart[] = cartData.products.map((p: { productId: number; quantity: number }) => {
        const product = productsData.find(prod => prod.id === p.productId);
        if (!product) return null;
        return { ...product, quantity: p.quantity, type: "order" } as ICart;
      }).filter(Boolean) as ICart[];

      setCartItems(mappedCart);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.iconContainer, { backgroundColor: colors.buttonText }]}>
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
