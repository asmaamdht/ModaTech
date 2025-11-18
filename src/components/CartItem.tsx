import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { saveCart, updateQuantity } from '../redux/Slice/cartSlice';
import { AppDispatch } from '../redux/store';
import { ICart } from '../types/components/cart';
import Counter from './Counter';
import DeleteAction from './DeleteAction';

interface Props {
  cart: ICart;
}

const CartItem: React.FC<Props> = ({ cart }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const renderRightActions = () => <DeleteAction cart={cart} />;

  return (
    <Swipeable renderRightActions={renderRightActions}>
    <View style={[styles.card, { backgroundColor: colors.cart }]}>
  
      <View style={[styles.imageContainer , {backgroundColor: colors.surface}]}>
        <Image source={{ uri: cart.image }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{cart.title.split(" ").slice(0,2).join(" ")}</Text>
        <Text style={[styles.category, { color: colors.textLight }]}>{cart.category}</Text>

        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: colors.textSecondary }]}>${cart.price.toFixed(2)}</Text>
          <Counter
            min={1}
            max={10}
            value={cart.quantity}
            onValueChange={(newQty) => {
                dispatch(updateQuantity({ id: cart.id, quantity: newQty }));
                dispatch(saveCart());
            }}
          />
        </View>
      </View>
    </View>
    </Swipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: wp('3%'),
    marginVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  imageContainer:{
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center",
  },
  image: {
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'contain',
    alignSelf:"center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  category: {
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
  },
  bottomRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});
