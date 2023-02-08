import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';

const useAuth = () => {
  const [id, setId] = useState<null | string>('');
  const [email, setEmail] = useState<null | string>('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const respUserId = await AsyncStorage.getItem('userId');
    const responseEmail = await AsyncStorage.getItem('email');

    if (respUserId) {
      setId(respUserId);
    }
    if (responseEmail) {
      setEmail(responseEmail);
    }

    console.log('usr d', respUserId);
    console.log('tye of', typeof respUserId);
  };

  const setUserId = async (userId: string) => {
    return await AsyncStorage.setItem('userId', userId);
  };

  const setUserEmail = async (email: string) => {
    return await AsyncStorage.setItem('email', email);
  };

  return {email, id, setUserEmail, setUserId};
};

export default useAuth;
