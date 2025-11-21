import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setuserdata } from '../../redux/Slice/userslice';

interface LoaduserdataProps {
  onLoadComplete?: () => void;
}

const Loaduserdata: React.FC<LoaduserdataProps> = ({ onLoadComplete }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const loaduser = async () => {
          try{
            const uservalue = await AsyncStorage.getItem('userdata');
            if (uservalue) {
                dispatch(setuserdata(JSON.parse(uservalue) as { token: string; username: string }));

            };
          } catch (error)  {
               console.error('Error loading user data:', error);
          } finally {
            onLoadComplete?.();
          }
            

        }
        loaduser();
    }, [dispatch,onLoadComplete]);
    return null;
};




export default Loaduserdata

