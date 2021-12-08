import 'react-native-gesture-handler';

//Components React
import React from 'react';
import { StatusBar } from 'react-native';

//Components Importados
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

//Components Locais
import Login from "./src/screen/login/login";
import Main from './src/screen/main'

export default function Stack ()  {
  return (
    <NavigationContainer independent={true}>
      <StatusBar
        hidden = {true}
      />
      <AuthStack.Navigator
      initialRouteName = 'Login'

      screenOptions = {{
        headerShown : false
      }}
      >
        <AuthStack.Screen name = "Login" component = {Login} />
        <AuthStack.Screen name = "Main" component = {Main} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}