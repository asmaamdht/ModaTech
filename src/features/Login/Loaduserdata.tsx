import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setuserdata } from '../../redux/Slice/userslice';
const Loaduserdata: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const loaduser = async () => {
            const uservalue = await AsyncStorage.getItem('userdata');
            if (uservalue) {
                dispatch(setuserdata(JSON.parse(uservalue) as { token: string; username: string }));

            };

        }
        loaduser();
    }, [dispatch]);
    return null;
};




export default Loaduserdata

