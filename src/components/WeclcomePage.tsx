import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/src/constants/Routes';

const WelcomePage = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate(ROUTES.ONBOARDING as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/bg.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome To The ModaTeck App</Text>
          <Text style={styles.desc}>
            ModaTeck free shopping experience
          </Text>

          <TouchableOpacity
            style={styles.btnStart}
            onPress={handleGetStarted}
          >
            <Text style={styles.BtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  card: {
    width: '95%',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e1518378',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2C3E50',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  btnStart: {
    backgroundColor: '#e15184',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 70,
  },
  BtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomePage;