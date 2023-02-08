import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {withTheme, configureFonts} from 'react-native-paper';
import Route from './Route';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const fonts = {
  android: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
      fontSize: 16,
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
      fontSize: 16,
    },
    bold: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'normal',
      fontSize: 16,
    },
    semibold: {
      fontFamily: 'Poppins-SemiBold',
      fontWeight: 'normal',
      fontSize: 16,
    },
  },
};
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#18191a',
    secondary: 'yellow',
    text: 'white',
    button: '#8875FF',
    modal: '#363636',
    placeholder: 'white',
    list: '#FAD5A5',
  },
  //fonts: configureFonts({config: fonts, isV3: false}),
};

export type AppThemeType = typeof theme;

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Route />
    </PaperProvider>
  );
};

export default withTheme(App);
