import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import screen
import Login from './screen/login';
import Register from './screen/register';
import Verification_phone from './screen/verification_phone';
import Verification_done from './screen/verification_done';
import Home_cars from './screen/home_car';

export default function App() {
  return (
      // <Login />
     // <Register /> 
      // <Verification_phone />
      // <Verification_done />
      <Home_cars />
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
