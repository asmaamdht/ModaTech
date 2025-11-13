import React, { useState } from 'react'
import {
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/src/components/InputField';
import StyleProfile from './StyleProfile';
import CustomBottomNav from '@/src/components/CustomBottomNav';
import StyledText from '@/src/components/StyledText';


const Profile: React.FC = () => {

  const [userInfo, setUserInfo] = useState({
    firstName: 'Asmaa',
    lastName: 'Medhat',
    email: 'asmaamedhat@gmail.com',
    phone: '01032547856',
    address: 'KomHamada',
  })
  console.log(setUserInfo);


  return (
    <SafeAreaView style={StyleProfile.container}>

      <StyledText title='User Profile' />
      <InputField
        value={userInfo.firstName}
        editable={false}
      />
      <InputField
        value={userInfo.lastName}
        editable={false}

      />
      <InputField
        value={userInfo.email}
        editable={false}

      />
      <InputField
        value={userInfo.phone}
        editable={false}

      />
      <InputField
        value={userInfo.address}
        editable={false}

      />

      <CustomBottomNav value="Logout" onPress={() => { }} />

    </SafeAreaView>
  );
};

export default Profile;
