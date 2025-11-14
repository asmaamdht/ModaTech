import React, { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';
import StyleProfile from './StyleProfile';
import StyledText from '@/src/components/StyledText';
import StyledButton from '@/src/components/StyledButton';
import StyledInput from '@/src/components/StyledInput';


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

      <StyledButton value="Logout" onPress={() => { }} />

    </SafeAreaView>
  );
};

export default Profile;
