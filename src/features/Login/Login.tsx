import StyledButton from "@/src/components/StyledButton";
import StyledInput from "@/src/components/StyledInput";
import { Colors } from "@/src/constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import z from "zod";
import { setuserdata } from "../../redux/Slice/userslice";
import { AppDispatch } from "../../redux/store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { t } = useTranslation();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  const schema = z.object({
    username: z.string().regex(/^[A-Za-z0-9_]{3,20}$/, "username is required"),
    password: z
      .string()
      .regex(/^[A-Za-z0-9@$!%*#?&^_\-]{6,}$/, "Invalid password"),
  });
  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post(`https://fakestoreapi.com/auth/login`, {
        username: data.username,
        password: data.password,
      });

      // console.log(res);
      return {
        token: res.data.token,
        username: data.username,
      };
    },
    onSuccess: async (res) => {
      const usersRes = await axios.get("https://fakestoreapi.com/users");

      const currentUser = usersRes.data.find(
        (u: any) => u.username === res.username
      );

      const userdata = {
        token: res.token,
        username: res.username,
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        phone: currentUser.phone,
        address: { city: currentUser.address.city },
      };
      await AsyncStorage.setItem("userdata", JSON.stringify(userdata));
      dispatch(setuserdata(userdata));
    },
  });
  function handleLogin(data: FormData) {
    // console.log("hello",value);
    mutation.mutate(data);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[Styles.container, { backgroundColor: theme.colors.background }]}
      >
        <LottieView
          ref={animationRef}
          source={require("../../assets/images/shopping.json")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
          autoPlay
          loop
        />
        <Text style={Styles.mainheader}>{t("login")}</Text>
        {mutation.isError && (
          <Text style={Styles.errors}> username and password are invalid</Text>
        )}

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledInput
              placeholder={t("usernamePlaceholder")}
              // style={Styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {formState.errors.username && (
          <Text style={Styles.errors}>
            {" "}
            {formState.errors.username.message}
          </Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledInput
              placeholder={t("passwordPlaceholder")}
              // style={Styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={true}
            />
          )}
        />
        {formState.errors.password && (
          <Text style={Styles.errors}>
            {" "}
            {formState.errors.password.message}
          </Text>
        )}
        <StyledButton
          value={
            mutation.isPending ? (
              <ActivityIndicator color={"white"} />
            ) : (
              t("login")
            )
          }
          onPress={handleSubmit(handleLogin)}
          disabled={mutation.isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "blue",
  },
  mainheader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.light.primary,
  },
  input: {
    width: "90%",
    borderColor: "#aeaeae",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errors: {
    color: "red",
  },
});

export default Login;
