import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import screen
import Login from './screen/login';
import Register from './screen/register';
import Verification_phone from './screen/verification_phone';
import Product_detail from './screen/product_detail';
import Search_results from './screen/search_results';
import BottomNav from './navigator/BottomNavigator';
import Favorite_product from './screen/favorite_product';
import User_Profile from './screen/user_profile';
import Pay_site from './screen/pay_to_site';
import Product_detail_my from './screen/product_detail_my';
import UserReview from './screen/user_review';
import ChatScreen from './screen/messages_details';
import { GetData } from './screen/Syncstorage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = React.useState(null);

  useEffect(() => {
    GetData('user_id').then((res) => {
      console.log("here res -------"+res);
      if (res) {
        console.log("here true -------"+res);
        setIsLogin(true);
      }
      if (!res) {
        console.log("here false -------"+res);
        setIsLogin(false);
      }
    });
  }, []);

  if (isLogin === null) {
    return null;
  }

  return (
    console.log("final=========="+isLogin),
    <NavigationContainer>
        {isLogin ? (
          <>
            <Stack.Navigator initialRouteName='Bottom' screenOptions={{animation: 'none'}}>
            <Stack.Screen name="Bottom" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="Product_detail" component={Product_detail} options={{ headerShown: false }} />
            <Stack.Screen name="Search_results" component={Search_results} options={{ headerShown: false }} />
            <Stack.Screen name="Favorite_product" component={Favorite_product} options={{ headerShown: false }} />
            <Stack.Screen name="User_Profile" component={User_Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Pay_site" component={Pay_site} options={{ headerShown: false }} />
            <Stack.Screen name="Product_detail_my" component={Product_detail_my} options={{ headerShown: false }} />
            <Stack.Screen name="UserReview" component={UserReview} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Verification_phone" component={Verification_phone} options={{ headerShown: false }} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator initialRouteName='Login' screenOptions={{animation: 'none'}}>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Verification_phone" component={Verification_phone} options={{ headerShown: false }} />
              <Stack.Screen name="Bottom" component={BottomNav} options={{ headerShown: false }} />
              <Stack.Screen name="Product_detail" component={Product_detail} options={{ headerShown: false }} />
              <Stack.Screen name="Search_results" component={Search_results} options={{ headerShown: false }} />
              <Stack.Screen name="Favorite_product" component={Favorite_product} options={{ headerShown: false }} />
              <Stack.Screen name="User_Profile" component={User_Profile} options={{ headerShown: false }} />
              <Stack.Screen name="Pay_site" component={Pay_site} options={{ headerShown: false }} />
              <Stack.Screen name="Product_detail_my" component={Product_detail_my} options={{ headerShown: false }} />
              <Stack.Screen name="UserReview" component={UserReview} options={{ headerShown: false }} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </>
        )}

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
