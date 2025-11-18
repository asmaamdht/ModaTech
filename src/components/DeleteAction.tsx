import { Alert, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { removeFromCart, saveCart } from "../redux/Slice/cartSlice";
import { AppDispatch } from "../redux/store";
import { ICart } from "../types/components/cart";

interface Props {
  cart: ICart;
}

const DeleteAction: React.FC<Props> = ({ cart }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <RectButton
      style={styles.deleteButton}
      onPress={() => {
        Alert.alert(
          "Remove Item",
          "Are you sure you want to remove this item?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                dispatch(removeFromCart(cart.id));
                dispatch(saveCart());
              }
            },
          ]
        );
      }}
    >
    <Ionicons name="trash" size={24} color="#fff" />
    </RectButton>
  );
};

export default DeleteAction;

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginVertical: hp('2%'),
  },
});
