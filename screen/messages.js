import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Messages({navigation}) {
    const [Number, setNumber] = useState();
    // const [Date, setDate] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }


    return (
        <View style={styles.container}>
            <Text style={{fontFamily: "Bold", fontSize: 26, color: "#000", marginTop: 50, marginBottom: 25}}>الرسائل</Text>
            <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 1.5, opacity: 0.3}}></View>
            <View style={{ width: "100%", height: 90, borderRadius: 20, flexDirection: 'row', alignItems: "center", marginRight: "40%"}}>
                <View style={{ width: "100%", height: 80, justifyContent: "center"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D', width: "95%"}}>المستخدم 1</Text>
                    <Text style={{ fontFamily: "Bold", fontSize: 12, color: '#000', width: "95%"}}>مرحبا كيف الحال أريد ان استفسر على هذه اللوحة</Text>
                </View>
                <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                </View>
            </View>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 2, opacity: 0.3}}></View>
            <View style={{ width: "100%", height: 90, borderRadius: 20, flexDirection: 'row', alignItems: "center", marginRight: "40%"}}>
            <View style={{ width: "100%", height: 80, justifyContent: "center"}}>
                <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D', width: "95%"}}>المستخدم 1</Text>
                <Text style={{ fontFamily: "Small", fontSize: 12, color: '#000', width: "95%"}}>مرحبا كيف الحال أريد ان استفسر على هذه اللوحة</Text>
            </View>
            <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
            </View>
            </View>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 2, opacity: 0.3}}></View>
                <View style={{ width: "100%", height: 90, borderRadius: 20, flexDirection: 'row', alignItems: "center", marginRight: "40%"}}>
                <View style={{ width: "100%", height: 80, justifyContent: "center"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D', width: "95%"}}>المستخدم 1</Text>
                    <Text style={{ fontFamily: "Bold", fontSize: 12, color: '#000', width: "95%"}}>مرحبا كيف الحال أريد ان استفسر على هذه اللوحة</Text>
                </View>
                <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                </View>
            </View>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 2, opacity: 0.3}}></View>
            <View style={{ width: "100%", height: 90, borderRadius: 20, flexDirection: 'row', alignItems: "center", marginRight: "40%"}}>
            <View style={{ width: "100%", height: 80, justifyContent: "center"}}>
                <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D', width: "95%"}}>المستخدم 1</Text>
                <Text style={{ fontFamily: "Small", fontSize: 12, color: '#000', width: "95%"}}>مرحبا كيف الحال أريد ان استفسر على هذه اللوحة</Text>
            </View>
            <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
            </View>
            </View>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 2, opacity: 0.3}}></View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },

});
