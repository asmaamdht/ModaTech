import { TextInputProps } from "react-native";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}


export interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isRTL: boolean;
}

export interface SearchProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  gradientColors?: [string, string, ...string[]];
  isRTL?: boolean;
}

export interface HomeHeaderProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}
