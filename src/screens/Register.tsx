import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text, withTheme, TextInput, Button} from 'react-native-paper';
import {AppThemeType} from '../../App';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

interface IProps {
  theme: AppThemeType;
  navigation: any;
}

const Register = ({theme, navigation}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');

  const validate = () => {
    if (!email.includes('@')) {
      setEmailError('Invalid Email');
    } else if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters');
    } else if (email.length === 0) {
      setEmailError('Email is required');
    } else if (email.indexOf(' ') >= 0) {
      setEmailError('Email should not have spaces');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password should not have spaces');
    } else if (password !== cpassword) {
      setCpasswordError('Password donot match');
    } else {
      setEmailError('');
      setPasswordError('');
      setCpasswordError('');
      onRegister();
      // alert("New account created successfully");
    }
  };
  const onRegister = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        alert('User account created!');
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
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
          Register
        </Text>
      </View>
      <View style={{padding: 15, marginTop: 50}}>
        <Text variant="titleMedium" style={{color: theme.colors.text}}>
          Email
        </Text>
        <TextInput
          placeholder="Enter your Email"
          mode="outlined"
          style={{height: 60}}
          value={email}
          error={emailError !== ''}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
        />
        <Text style={styles.error}>{emailError}</Text>
        <Text
          variant="titleMedium"
          style={{color: theme.colors.text, marginTop: 15}}>
          Password
        </Text>
        <TextInput
          placeholder="Enter your Password"
          mode="outlined"
          style={{height: 60}}
          value={password}
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
        />
        <Text style={styles.error}>{passwordError}</Text>
        <Text
          variant="titleMedium"
          style={{color: theme.colors.text, marginTop: 15}}>
          Confirm Password
        </Text>
        <TextInput
          placeholder="Re-enter your Password"
          mode="outlined"
          style={{height: 60}}
          value={cpassword}
          secureTextEntry
          onChangeText={text => {
            setCpassword(text);
            setCpasswordError('');
          }}
        />
        <Text style={styles.error}>{cpasswordError}</Text>
      </View>
      <Button
        onPress={validate}
        loading={loading}
        mode="elevated"
        buttonColor={theme.colors.button}
        textColor={theme.colors.text}
        labelStyle={{fontSize: 20}}
        style={{paddingVertical: 6, marginTop: 50}}>
        REGISTER
      </Button>
    </View>
  );
};

export default withTheme(Register);

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
  },
});
