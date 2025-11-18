import { ROUTES } from "@/src/constants/Routes";
import Home from "@/src/features/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StackNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={ROUTES.HOME} component={Home} />
      {/* <Screen name={ROUTES.PRODUCT_DETAISL} component={ProductDetails} /> */}
    </Navigator>
  );
};

export default StackNavigator;
