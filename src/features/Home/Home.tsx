import { ROUTES } from "@/src/constants/Routes";
import { useTheme } from "@/src/contexts/ThemeContext";
import { fetchProducts } from "@/src/redux/Slice/productSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { Product } from "@/src/types/components/home";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "./AppBar";
import CategoryTabs, { Category } from "./CategoryTabs";
import LowestPrice from "./LowestPrices";
import MostPopular from "./MostPopular";
import ProductCard from "./ProductCard";
import Search from "./Search";

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const isRTL = i18n.language === "ar";

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products, searchText]);

  const filterProducts = () => {
    let filtered: Product[] = [];

    if (selectedCategory === "all") {
      const allowedCategories = ["electronics", "jewelery", "men's clothing"];
      filtered = products.filter((product) =>
        allowedCategories.includes(product.category.toLowerCase())
      );
    } else {
      filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchText.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate(ROUTES.PRODUCT_DETAISL, { product });
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <AppBar navigation={navigation} />

      <View style={{ width: "100%" }}>
        <Search
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          isRTL={isRTL}
        />
      </View>

      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isRTL={isRTL}
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            {t("noProductsAvailable")}
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.horizontalScroll,
            isRTL && styles.horizontalScrollRTL,
          ]}
          style={styles.scrollView}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
              isRTL={isRTL}
            />
          ))}
        </ScrollView>
      )}

      <MostPopular onPressItem={handleProductPress} isRTL={isRTL} />

      <LowestPrice onPressItem={handleProductPress} isRTL={isRTL} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  scrollView: {
    flex: 1,
  } as ViewStyle,
  horizontalScroll: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    flexDirection: "row",
    alignItems: "flex-start",
  } as ViewStyle,
  horizontalScrollRTL: {
    flexDirection: "row-reverse",
  } as ViewStyle,
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  errorText: {
    fontSize: wp(4),
    textAlign: "center",
  },
  emptyText: {
    fontSize: wp(4),
    textAlign: "center",
  },
});

export default Home;
