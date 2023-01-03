import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Svg } from 'react-native-svg';

// import screen
import Login from './screen/login';
import Register from './screen/register';
import Verification_phone from './screen/verification_phone';
import Product_detail from './screen/product_detail';
import BottomNav from './navigator/BottomNavigator';
import Favorite_product from './screen/favorite_product';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = React.useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Verification_phone" component={Verification_phone} options={{ headerShown: false }} />
        <Stack.Screen name="Bottom" component={BottomNav} options={{ headerShown: false }} />
        <Stack.Screen name="Product_detail" component={Product_detail} options={{ headerShown: false }} />
        <Stack.Screen name="Favorite_product" component={Favorite_product} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
