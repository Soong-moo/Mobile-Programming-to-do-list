import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from "./Tab";
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import MainScreen from "../Screens/MainScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={style}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: '로그인',
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerTitle: '회원가입',
          }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = {
  headerStyle: {
    backgroundColor: '#AABBCC',
    borderBottomWidth: 1,
  },
  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold' },
  headerTitleAlign: 'center',
  headerTintColor: '#FFFFFF'
};

export default StackNavigator;