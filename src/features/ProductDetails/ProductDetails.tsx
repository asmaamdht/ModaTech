import StyledButton from "@/src/components/StyledButton";
import StyledText from "@/src/components/StyledText";
import { useTheme } from "@/src/contexts/ThemeContext";
import i18n from "@/src/locales/i18n";
import {
  IProductDetails,
  RootStackParamList,
} from "@/src/types/components/product";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const ProductDetails = () => {
  const { t } = useTranslation();
  const route =
    useRoute<RouteProp<RootStackParamList, "ProductScreen">>().params;
  const navigation = useNavigation();
  const theme = useTheme();
  const isRTL = i18n.language === "ar";
  const prod: IProductDetails = route?.product;

  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: theme.colors.inputBackground },
        ]}
      >
        <ImageBackground
          source={
            theme.theme === "dark"
              ? require("../../assets/images/14.png")
              : require("../../assets/images/Ellipse 1.png")
          }
          resizeMode="stretch"
          style={
            theme.theme === "dark"
              ? styles.darkBackgroundImage
              : styles.backgroundImage
          }
        >
          <View
            style={[
              styles.header,
              {
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "flex-end",
              },
            ]}
          >
            <Pressable
              style={[styles.backBtn, theme.theme === "dark" && { top: "50%" }]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name={isRTL ? "arrow-forward" : "arrow-back"}
                size={24}
                color={theme.colors.text}
              />
            </Pressable>
            <Image
              resizeMode="center"
              source={{ uri: prod.image }}
              style={[
                styles.prodImage,
                theme.theme === "dark" && { top: "50%" },
              ]}
            />
          </View>
        </ImageBackground>
        <ScrollView style={{ flex: 1, top: hp("5") }}>
          <StyledText
            title={prod.title}
            style={[styles.prodTitle, { color: theme.colors.text }]}
          />
          <StarRatingDisplay
            rating={prod.rating.rate}
            starSize={20}
            style={{ marginVertical: hp("1"), marginHorizontal: hp("-1") }}
          />
          <View style={styles.container}>
            <View style={styles.container}>
              <StyledText
                title={prod.price + " $"}
                style={[styles.price, { color: theme.colors.text }]}
              />
              {/* <StyledText
                title={prod.sale}
                style={[styles.sale, { color: theme.colors.text }]}
              /> */}
            </View>
            <StyledText
              title={t("avaiableProd")}
              style={[styles.price, { color: theme.colors.text }]}
            />
          </View>
          <StyledText
            style={[styles.desc, { color: theme.colors.text }]}
            title={prod.description}
          />
        </ScrollView>
        <StyledButton
          value={t("addCart")}
          style={[
            styles.cartBtn,
            {
              alignSelf: isRTL ? "flex-start" : "flex-end",
              flexDirection: isRTL ? "row-reverse" : "row",
            },
          ]}
          onPress={() => {}}
          icon={
            <FontAwesome5 name="shopping-cart" size={hp("2")} color="white" />
          }
          textStyle={{ fontSize: hp("2.2"), textAlign: "left" }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default ProductDetails;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: hp("4"),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backgroundImage: {
    flex: 1,
    width: wp("100"),
    height: hp("45"),
    alignSelf: "center",
    position: "relative",
  },
  darkBackgroundImage: {
    flex: 1,
    width: wp("120"),
    height: hp("65"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    top: hp("-20"),
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  backBtn: {
    marginHorizontal: wp("2"),
    marginVertical: hp("4"),
    height: hp("4"),
    width: wp("8"),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    alignSelf: "flex-start",
    zIndex: 99,
  },
  prodImage: {
    width: wp("90"),
    height: hp("40"),
    alignSelf: "center",
  },
  prodTitle: {
    fontSize: hp("2.5"),
    fontWeight: "bold",
    color: "#000000BF",
    margin: 0,
    padding: 0,
  },
  price: {
    fontSize: hp("2.2"),
    fontWeight: "700",
  },
  sale: {
    fontSize: hp("1.5"),
    color: "#AFAFAF",
    marginLeft: hp("1"),
  },
  desc: { fontSize: hp("1.8"), marginTop: hp("0.8") },
  cartBtn: {
    width: wp("50"),
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
