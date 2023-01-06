import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screen
import Home_cars from '.././screen/home_car';
import Add_product from '.././screen/add_product';
import Search from '.././screen/search';
import Messages from '.././screen/messages';
import Profile from '.././screen/profile';
import Product_detail from '.././screen/product_detail';



const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
          headerShown: false,
          tabBarStyle: [
            {
              height:60,
              width: '100%',
              backgroundColor:'#fff',
              display: "flex",
            },
          ],
        }}>
        <Tab.Screen name="Profile" component={Profile}
          options={{
            headerShown: false,
            navigation :Tab.navigation,
            title: 'Profile',
            tabBarVisible: 'false',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 26, height: 26 , opacity: 1}}
                  source={focused ? require('../assets/profile_active.png') : require('../assets/profile_inactive.png')}
                />
              );
            },}}
        />

        <Tab.Screen name="Messages" component={Messages}
          options={{
            headerShown: false,
            navigation :Tab.navigation,
            title: 'Messages',
            tabBarVisible: 'false',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 18, height: 18 , opacity: 0.5}}
                  source={focused ? require('../assets/messages_active.png') : require('../assets/messages_inactive.png')}
                />
              );
            },}}
        />

        <Tab.Screen name="Add_product" component={Add_product}
          options={{
            headerShown: false,
            navigation :Tab.navigation,
            title: 'Home',
            tabBarVisible: 'false',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <View style={{ width: 78, height: 40 , backgroundColor: '#5E66EE', borderRadius: 50, opacity: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{ width: 20, height: 20, opacity: 1}}
                    source={focused ? require('../assets/plus_tab.png') : require('../assets/plus_tab.png')}
                  />
                </View>
              );
            },}}
        />

        <Tab.Screen name="Search" component={Search}
          options={{
            headerShown: false,
            navigation :Tab.navigation,
            title: 'Search',
            tabBarVisible: 'false',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 21, height: 21 , opacity: 0.5}}
                  source={focused ? require('../assets/search_active.png') : require('../assets/search_inatcive.png')}
                />
              );
            },}}
        />

        <Tab.Screen name="Home" component={Home_cars}
          options={{
            headerShown: false,
            navigation :Tab.navigation,
            title: 'Home',
            tabBarVisible: 'false',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 20, height: 20 , opacity: 0.8}}
                  source={focused ? require('../assets/home_active.png') : require('../assets/home_inactive.png')}
                />
              );
            },}} 
        /> 
      </Tab.Navigator>
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
