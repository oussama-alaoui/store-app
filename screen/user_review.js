import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView, TouchableOpacity } from "react-native";

export default function UserReview({navigation}) {
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 20, marginTop: 20}}>
                <TouchableOpacity>
                    <Image source={require("../assets/back.png")} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20, fontFamily: "Bold"}}>ملاحظات حول المستخدم</Text>
            <View style={{height: 1, width: "100%", backgroundColor: "gray", marginTop: 30, opacity: 0.3}}></View>
            <View style={{justifyContent: "center", width: "100%", marginTop: 20, alignItems: "center"}}>
                <View style={{flexDirection: "row", width: "90%", marginBottom: 30}}>
                <View style={{ width: "80%", justifyContent: "center", borderRadius: 100}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000', marginRight: "4%"}}>المستخدم 1</Text>
                    <View style={{width: 100, height: 30, alignItems: 'center', flexDirection: 'row',justifyContent: 'space-around', marginLeft: "55%"}}>
                        <Image source={require('../assets/star_inactive.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                    </View>
                    <Text   style={{borderRadius: 10, elevation: 2, shadowColor: 'black', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',padding: 14, lineHeight: 25, color: '#8D8D8D', fontFamily: 'Bold', fontSize: 13}} >هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي ا</Text>
                </View>
                <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                </View>
                </View>
                <View style={{flexDirection: "row", width: "90%"}}>
                <View style={{ width: "80%", justifyContent: "center", borderRadius: 100}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000', marginRight: "4%"}}>المستخدم 1</Text>
                    <View style={{width: 100, height: 30, alignItems: 'center', flexDirection: 'row',justifyContent: 'space-around', marginLeft: "55%"}}>
                        <Image source={require('../assets/star_inactive.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                    </View>
                    <Text   style={{borderRadius: 10, elevation: 2, shadowColor: 'black', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',padding: 14, lineHeight: 25, color: '#8D8D8D', fontFamily: 'Bold', fontSize: 13}} >هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي ا</Text>
                </View>
                <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                </View>
                </View>
            </View>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});
