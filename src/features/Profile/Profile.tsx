import React, { useState } from 'react';

import StyledButton from '@/src/components/StyledButton';
import StyledInput from '@/src/components/StyledInput';
import StyledText from '@/src/components/StyledText';
import { ROUTES } from '@/src/constants/Routes';
import { clearuserdata } from '@/src/redux/Slice/userslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import StyleProfile from './StyleProfile';

const Profile: React.FC = () => {

  const [userInfo, setUserInfo] = useState({
    firstName: 'Asmaa',
    lastName: 'Medhat',
    email: 'asmaamedhat@gmail.com',
    phone: '01032547856',
    address: 'KomHamada',
  })

  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLogout = async () => {
    dispatch(clearuserdata());
    await AsyncStorage.removeItem("userdata");
    navigation.dispatch(StackActions.replace(ROUTES.LOGIN));
  }


  return (
    <SafeAreaView style={StyleProfile.container}>

      <StyledText title='User Profile' />
      <StyledInput
        value={userInfo.firstName}
        editable={false}
      />
      <StyledInput
        value={userInfo.lastName}
        editable={false}

      />
      <StyledInput
        value={userInfo.email}
        editable={false}

      />
      <StyledInput
        value={userInfo.phone}
        editable={false}

      />
      <StyledInput
        value={userInfo.address}
        editable={false}

      />

      <StyledButton value="Logout" onPress={handleLogout} />

    </SafeAreaView>
  );
};

export default Profile;
function dispatch(clearuserdata: any) {
  throw new Error('Function not implemented.');
}

