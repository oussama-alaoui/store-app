import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import Loadings from "./complement/loadings";

const ScreenWithLinks = ({navigation}) => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };
  let [fontsLoaded] = useFonts({
    Small: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
    Medium : require("../assets/fonts/NotoSansArabic-Medium.ttf"),
    Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
    X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>المزيد</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', right: 20}}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/back_messages.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
            style={{alignItems: 'flex-end', marginBottom: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 2, paddingBottom: 10}}
            onPress={() => handleLinkPress('https://lohty.com/#commision')}>
          <Text style={styles.link}>حاسبة العمولة</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{alignItems: 'flex-end', marginBottom: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 2, paddingBottom: 10}}
            onPress={() => handleLinkPress('https://lohty.com/#accounts')}>
          <Text style={styles.link}>ارقام الحسابات</Text>
        </TouchableOpacity>        
        <TouchableOpacity
            style={{alignItems: 'flex-end', marginBottom: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 2, paddingBottom: 10}}
            onPress={() => handleLinkPress('https://lohty.com/#terms')}>
          <Text style={styles.link}>الشروط والاحكام</Text>
        </TouchableOpacity>        
        <TouchableOpacity
            style={{alignItems: 'flex-end', marginBottom: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 2, paddingBottom: 10}}
            onPress={() => handleLinkPress('https://lohty.com/#contact')}>
          <Text style={styles.link}>تواصل معنا</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0374BF',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 18,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  link: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: '#376286',
    marginBottom: 10,
  },
});

export default ScreenWithLinks;
