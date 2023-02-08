import React from 'react';
import {Image} from 'react-native';
import {View, SafeAreaView} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import {AppThemeType} from '../../App';

interface IProps {
  theme: AppThemeType;
  navigation: any;
}

const Splash = ({theme, navigation}: IProps) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <View style={{padding: 15, position: 'relative', height: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            top: 40,
          }}>
          <Text
            variant="displaySmall"
            style={{color: theme.colors.text, marginTop: 15}}>
            Welcome to Todo app
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.text,
              marginTop: 15,
              paddingHorizontal: 15,
            }}>
            Please login to your account or create new account to continue
          </Text>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/list.png')}
              style={{resizeMode: 'contain', width: 300}}
            />
          </View>
        </View>
        <View
          style={{
            bottom: 40,
            right: 0,
            left: 0,
            padding: 20,
            position: 'absolute',
          }}>
          <Button
            onPress={() => navigation.navigate('Login')}
            mode="elevated"
            buttonColor={theme.colors.button}
            textColor={theme.colors.text}
            labelStyle={{fontSize: 20}}
            style={{paddingVertical: 6}}>
            LOGIN
          </Button>
          <Button
            onPress={() => navigation.navigate('Register')}
            mode="outlined"
            textColor={theme.colors.text}
            labelStyle={{fontSize: 20, borderColor: theme.colors.button}}
            style={{paddingVertical: 6, marginTop: 10}}>
            CREATE ACCOUNT
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(Splash);
