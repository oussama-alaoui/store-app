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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={{ 
    //       tabBarActiveTintColor: 'white',
    //       tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
    //       headerShown: false,
    //       tabBarStyle: [
    //         {
    //           height:60,
    //           width: '100%',
    //           backgroundColor:'#fff',
    //           display: "flex",
    //         },
    //       ],
    //     }}>
    //     <Tab.Screen name="Profile" component={Profile}
    //       options={{
    //         headerShown: false,
    //         navigation :Tab.navigation,
    //         title: 'Profile',
    //         tabBarVisible: 'false',
    //         tabBarIcon: ({size,focused,color}) => {
    //           return (
    //             <Image
    //               style={{ width: 26, height: 26 , opacity: 1}}
    //               source={focused ? require('./assets/profile_active.png') : require('./assets/profile_inactive.png')}
    //             />
    //           );
    //         },}}
    //     />

    //     <Tab.Screen name="Messages" component={Messages}
    //       options={{
    //         headerShown: false,
    //         navigation :Tab.navigation,
    //         title: 'Messages',
    //         tabBarVisible: 'false',
    //         tabBarIcon: ({size,focused,color}) => {
    //           return (
    //             <Image
    //               style={{ width: 18                                                                                          , height: 18 , opacity: 0.5}}
    //               source={focused ? require('./assets/messages_active.png') : require('./assets/messages_inactive.png')}
    //             />
    //           );
    //         },}}
    //     />

    //     <Tab.Screen name="Add_product" component={Add_product}
    //       options={{
    //         headerShown: false,
    //         navigation :Tab.navigation,
    //         title: 'Home',
    //         tabBarVisible: 'false',
    //         tabBarIcon: ({size,focused,color}) => {
    //           return (
    //             <View style={{ width: 78, height: 40 , backgroundColor: '#5E66EE', borderRadius: 50, opacity: 1, alignItems: 'center', justifyContent: 'center'}}>
    //               <Image
    //                 style={{ width: 20, height: 20, opacity: 1}}
    //                 source={focused ? require('./assets/plus_tab.png') : require('./assets/plus_tab.png')}
    //               />
    //             </View>
    //           );
    //         },}}
    //     />

    //     <Tab.Screen name="Search" component={Search}
    //       options={{
    //         headerShown: false,
    //         navigation :Tab.navigation,
    //         title: 'Search',
    //         tabBarVisible: 'false',
    //         tabBarIcon: ({size,focused,color}) => {
    //           return (
    //             <Image
    //               style={{ width: 21, height: 21 , opacity: 0.5}}
    //               source={focused ? require('./assets/search_active.png') : require('./assets/search_inatcive.png')}
    //             />
    //           );
    //         },}}
    //     />

    //     <Tab.Screen name="Home" component={Home_cars}
    //       options={{
    //         headerShown: false,
    //         navigation :Tab.navigation,
    //         title: 'Home',
    //         tabBarVisible: 'false',
    //         tabBarIcon: ({size,focused,color}) => {
    //           return (
    //             <Image
    //               style={{ width: 20, height: 20 , opacity: 0.8}}
    //               source={focused ? require('./assets/home_active.png') : require('./assets/home_inactive.png')}
    //             />
    //           );
    //         },}} 
    //     /> 

    //     <Tab.Screen name="Product_details" component={Product_detail}
    //               options={{
    //                 headerShown: false,
    //                 navigation :Tab.navigation,
    //                 title: 'Product_details',
    //                 tabBarVisible: 'true',
    //                 }} 
    //       />
    //   </Tab.Navigator>
    // </NavigationContainer>


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Verification_phone" component={Verification_phone} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomNav} options={{ headerShown: false }} />
        <Stack.Screen name="Product_details" component={Product_detail} options={{ headerShown: false }} />
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
