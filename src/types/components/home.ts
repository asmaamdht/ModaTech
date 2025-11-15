import { TextInputProps } from "react-native";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?:{
    rate:number;
    count:number;
  }
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


export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface MostPopularProps {
  onPressItem?: (item: any) => void;
  isRTL: boolean;
}

export interface LowestPriceProps {
  onPressItem?: (item: any) => void;
  isRTL: boolean;
}


