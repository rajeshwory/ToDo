import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, withTheme, TextInput, Button} from 'react-native-paper';
import {AppThemeType} from '../../App';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';

interface IProps {
  theme: AppThemeType;
  navigation: any;
}

const Login = ({theme, navigation}: IProps) => {
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputPass, setTextInputPass] = useState('');
  const [loading, setLoading] = useState(false);

  const {setUserEmail, setUserId} = useAuth();
  const checkTextInput = () => {
    if (!textInputEmail.trim()) {
      alert('Please Enter Email');
      return;
    }

    if (!textInputPass.trim()) {
      alert('Please Enter Password');
      return;
    }
    // alert('Success');
    onLogin();
  };
  const onLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(textInputEmail, textInputPass)
      .then(response => {
        console.log(response);
        setLoading(false);

        setUserId(response.user.uid);
        setUserEmail(textInputEmail);

        navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/invalid-email') {
          alert('email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          alert('Sorry!  password does not match!');
        }
        console.error(error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary, padding: 15}}>
      <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
        <AntDesignIcon name="left" color={theme.colors.text} size={30} />
      </TouchableOpacity>
      <View style={{paddingLeft: 15, marginTop: 25}}>
        <Text variant="displayMedium" style={{color: theme.colors.text}}>
          Login
        </Text>
      </View>
      <View style={{padding: 15, marginTop: 50}}>
        <Text variant="titleMedium" style={{color: theme.colors.text}}>
          Username
        </Text>
        <TextInput
          placeholder="Enter your Email"
          mode="outlined"
          style={{height: 60}}
          onChangeText={value => setTextInputEmail(value)}
        />
        <Text
          variant="titleMedium"
          style={{color: theme.colors.text, marginTop: 15}}>
          Password
        </Text>
        <TextInput
          placeholder="Enter your Password"
          mode="outlined"
          secureTextEntry
          style={{height: 60}}
          onChangeText={value => setTextInputPass(value)}
        />
      </View>
      <Button
        onPress={checkTextInput}
        mode="elevated"
        loading={loading}
        buttonColor={theme.colors.button}
        textColor={theme.colors.text}
        labelStyle={{fontSize: 20}}
        style={{paddingVertical: 6, marginTop: 50}}>
        LOGIN
      </Button>
    </View>
  );
};

export default withTheme(Login);
