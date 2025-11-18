import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../../components/StyledButton';
import StyledInput from '../../components/StyledInput';
import StyledText from '../../components/StyledText';
import { ROUTES } from '../../constants/Routes';
import { clearuserdata, setuserdata } from '../../redux/Slice/userslice';
import { RootState } from '../../redux/store';
import StyleProfile from './StyleProfile';

const Profile: React.FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {
    const getUserData = async () => {
      const userDataFromApi = await AsyncStorage.getItem('userdata');
      if (userDataFromApi) {
        const data = JSON.parse(userDataFromApi);
        dispatch(setuserdata(data));
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    dispatch(clearuserdata());
    await AsyncStorage.removeItem("userdata");
    navigation.dispatch(StackActions.replace(ROUTES.LOGIN));
  }


  return (
    <SafeAreaView style={StyleProfile.container}>

      <StyledText title='User Profile' />
      <View style={{ marginTop: 30 }}>

        <StyledInput
          value={user.name?.firstname || ""}
          editable={false}
        />
        <StyledInput
          value={user.name?.lastname || ""}
          editable={false}

        />
        <StyledInput
          value={user.email || ""}
          editable={false}

        />
        <StyledInput
          value={user.phone || ""}
          editable={false}

        />
        <StyledInput
          value={user.address?.city || ""}
          editable={false}

        />
      </View>

      <StyledButton value="Logout" onPress={handleLogout} />

    </SafeAreaView>
  );
};

export default Profile;


