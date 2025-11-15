import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from "react-redux";
import z from 'zod';
import { setuserdata } from '../../redux/Slice/userslice';
import { AppDispatch } from '../../redux/store';
import ButtonTh from './ButtonTh';


const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const schema = z.object({
    username: z.string().regex(/^[A-Za-z0-9_]{3,20}$/, 'username is required'),
    password: z.string().regex(/^[A-Za-z0-9@$!%*#?&^_\-]{6,}$/, "Invalid password"),
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
      const res = await axios.post(`https://fakestoreapi.com/auth/login`, { username: data.username, password: data.password })

      // console.log(res);
      return {
        token: res.data.token, username: data.username
      }
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
      }
      await AsyncStorage.setItem('userdata', JSON.stringify(userdata));
      dispatch(setuserdata(userdata));



    },

  });
  function handleLogin(data: FormData) {
    // console.log("hello",value);
    mutation.mutate(data);
  }

  return (
    <View style={Styles.container}>

      <Text style={Styles.mainheader}>Login</Text>
      {mutation.isError && <Text style={Styles.errors}> username and password are invalid</Text>}
      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder=' Enter your username'
            style={Styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />

        )}
      />
      {formState.errors.username && <Text style={Styles.errors}> {formState.errors.username.message}</Text>}
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder=' Enter your password'
            style={Styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={true}


          />
        )}
      />
      {formState.errors.password && <Text style={Styles.errors}> {formState.errors.password.message}</Text>}
      <ButtonTh title={mutation.isPending ? <ActivityIndicator color={"white"} /> : "login"} onPress={handleSubmit(handleLogin)} disabled={mutation.isPending} />




    </View>
  )
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  mainheader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: '90%',
    borderColor: "#aeaeae",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errors: {
    color: "red",
  }

})

export default Login