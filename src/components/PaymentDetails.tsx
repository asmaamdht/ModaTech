import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../constants/Routes';
import { useTheme } from '../contexts/ThemeContext';
import { clearCart } from '../redux/Slice/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import StyledButton from './StyledButton';


const PaymentDetails = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

  if (totalQuantity === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
          {t("yourCartIsEmpty")}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.paymentContainer, { backgroundColor: colors.cart, shadowColor: colors.shadow }]}>
      <Text style={[styles.paymentTitle, { color: colors.text }]}>{t("paymentDetails")} : </Text>
      {cartItems.map(item => (
        <View key={item.id} style={styles.paymentRow}>
          <Text style={[styles.item, { color: colors.text }]}>{item.title.split(" ").slice(0, 2).join(" ")}</Text>
          <Text style={[styles.item, { color: colors.text }]}>{`$${item.price}`}</Text>
        </View>
      ))}
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={[styles.totalText, { color: colors.text }]}>{t("total")}({totalQuantity} {totalQuantity > 1 ? t("items") : t("item")})</Text>
        <Text style={[styles.totalText, { color: colors.text }]}>{`$${totalPrice}`}</Text>
      </View>
      <StyledButton value={t("orderConfirmation")} onPress={() => {
        Toast.show({
          type: "success",
          text1: t("orderPlacedSuccessfully"),
          position: "top",
        });
        dispatch(clearCart());
        navigation.navigate(ROUTES.STACK, { screen: ROUTES.HOME })
      }
      } style={{ marginTop: 0 }} />
    </View>

  )
}

export default PaymentDetails

const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 70
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