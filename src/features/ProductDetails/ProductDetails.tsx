import StyledButton from "@/src/components/StyledButton";
import StyledText from "@/src/components/StyledText";
import { useTheme } from "@/src/contexts/ThemeContext";
import i18n from "@/src/locales/i18n";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const ProductDetails = () => {
  const prod = {
    id: 0,
    title: "Apple Watch Seriecs",
    price: "N45,000",
    sale: "N45,000",
    description:
      "The upgraded S6 SiP runs up to 20 percent faster, allowing apps to also launch 20 percent faster, while maintaining the same all-day 18-hour battery life.",
    category: "string",
    image: "../../assets/images/1.png",
  };
  const { t } = useTranslation();
  //const navigation = useNavigation();
  const theme = useTheme();
  const isRTL = i18n.language === "ar";

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
            // theme.theme === "dark"
            //   ? require("../../assets/images/14.png")
            //   :
            require("../../assets/images/Ellipse 1.png")
          }
          resizeMode="cover"
          style={
            theme.theme === "dark"
              ? styles.darkBackgroundImage
              : styles.backgroundImage
          }
        >
          <View
            style={[
              styles.header,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.backBtn,
                ,
                { backgroundColor: theme.colors.headerView },
              ]}
            >
              <Ionicons
                name={isRTL ? "arrow-back" : "arrow-forward"}
                size={24}
                color={theme.theme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/1.png")}
              style={styles.prodImage}
            />
          </View>
        </ImageBackground>
        <View style={{ top: hp("-5") }}>
          <StyledText
            title={prod.title}
            style={[styles.prodTitle, { color: theme.colors.text }]}
          />
          <StarRatingDisplay
            rating={4.5}
            starSize={20}
            style={{ marginVertical: hp("1"), marginHorizontal: hp("-1") }}
          />
          <View style={styles.container}>
            <View style={styles.container}>
              <StyledText
                title={prod.price}
                style={[styles.price, { color: theme.colors.text }]}
              />
              <StyledText
                title={prod.sale}
                style={[styles.sale, { color: theme.colors.text }]}
              />
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
        </View>
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
          textStyle={{ fontSize: hp("2.2") }}
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
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: wp("100"),
    height: hp("50"),
    alignSelf: "center",
  },
  darkBackgroundImage: {
    flex: 1,
    width: wp("100"),
    height: hp("50"),
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  backBtn: {
    marginHorizontal: hp("2"),
    marginVertical: hp("4"),
    height: hp("4"),
    width: wp("8"),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  prodImage: {
    width: wp("100"),
    height: hp("70"),
    resizeMode: "contain",
    position: "absolute",
    top: hp("-13"),
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
  desc: { fontSize: hp("2"), marginTop: hp("0.8") },
  cartBtn: {
    width: wp("50"),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
