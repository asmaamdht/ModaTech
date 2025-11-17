import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants/Routes';
import { useTheme } from '../contexts/ThemeContext';
import { RootState } from '../redux/store';
import StyledButton from './StyledButton';


const PaymentDetails = () => {
  const { colors } = useTheme();
  const navigation : any = useNavigation();
  const { cartItems,totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <View style={[styles.paymentContainer, { backgroundColor: colors.cart , shadowColor: colors.shadow }]}>
    <Text style={[styles.paymentTitle, { color: colors.text }]}>Payment Detail</Text>
    {cartItems.map(item => (
        <View key={item.id} style={styles.paymentRow}>
        <Text style={[styles.item, { color: colors.text }]}>{item.title.split(" ").slice(0,2).join(" ")}</Text>
        <Text style={[styles.item, { color: colors.text }]}>{`$${item.price}`}</Text>
        </View>
    ))}
    <View style={styles.divider} />
    <View style={styles.totalRow}>
        <Text style={[styles.totalText , {color: colors.text}]}>Total ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})</Text>
        <Text style={[styles.totalText , {color: colors.text}]}>{`$${totalPrice}`}</Text>
    </View>
    <StyledButton value='Order confirmation' onPress={() => navigation.navigate(ROUTES.STACK,{screen: ROUTES.HOME})}/>
    </View>

  )
}

export default PaymentDetails

const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  item: {
    fontSize: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})