import React, { useState, useEffect } from "react";
import {View,ScrollView,StyleSheet,ActivityIndicator,Text,ViewStyle,} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/contexts/ThemeContext";
import CategoryTabs, { Category } from "./CategoryTabs";
import ProductCard from "./ProductCard";
import { ROUTES } from "@/src/constants/Routes";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";
import Search from "./Search";
import AppBar from "./AppBar";
import { Product } from "@/src/types/components/home";


const Home = ({ navigation }: any) => {
 
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const isRTL = i18n.language === "ar";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products, searchText]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(t("failedToLoadProducts"));
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppBar navigation={navigation} />
      
       <View style={{ width: '100%' }}>
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
    </View>
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
