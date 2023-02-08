import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import useAuth from './src/hooks/useAuth';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  const {id} = useAuth();

  console.log('gggg', id);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!id ? (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{header: () => null}}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{header: () => null}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{header: () => null}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
