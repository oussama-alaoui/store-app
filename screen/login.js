import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


// import screen
import Register from "./register";



export default function Login({navigation}) {
    const [Number, setNumber] = useState();
    const [username, setUsername] = useState("");
    let [fontsLoaded] = useFonts({
       Small: require("../assets/fonts/NotoSansArabic-Thin.ttf"),
       Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
       X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
       Black: require("../assets/fonts/NotoSansArabic-Black.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    
    return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background_img}
                    source={require('../assets/login_background.jpeg')}>

                    <LinearGradient 
                        colors={['#00000000', '#ECECFF']} 
                        style={{height : '100%', width : '100%'}}>



                    </LinearGradient>

                </ImageBackground>
                <Text style={styles.title1}>السلام عليكم، </Text>
                <Text style={styles.title2}>المرجو تسجيل الدخول</Text>

                <Text style={styles.username_titel}>إسم المستخدم</Text>
                <TextInput
                    style={[styles.input, {borderRadius: 10}]}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="username"
                    keyboardType="ascii-mode"
                />


                <Text style={[styles.username_titel, {top: 395}]}>رقم الهاتف</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', top: 425}}>
                     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '11%', height: 42, backgroundColor: '#F3F4F9',borderTopLeftRadius: 10,borderBottomLeftRadius: 10, left: 14}}>
                         <Text style={{fontFamily: 'Bold',fontSize: 13,}}>+966</Text>
                     </View>
                     <TextInput
                         style={[styles.input, {top: 0, width: '80%', left: 52, borderTopRightRadius: 10, borderBottomRightRadius: 10}]}
                         onChangeText={setNumber}
                         value={Number}
                         placeholder=" 12 345 6789"
                         keyboardType="numeric"
                     />
                </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Verification_phone')}
                    >
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 20, color: 'white'}}>تسجيل الدخول</Text>
                    </TouchableOpacity> 
                    <View style={{flexDirection: 'row', left: 89}}>
                        <Text style={{fontFamily: 'Black',fontSize: 13, color: '#7E7E7E', top: 594,alignItems:'center'}} onPress={() => navigation.navigate('Register')}>سجل</Text>
                        <Text style={{fontFamily: 'Bold',fontSize: 12, color: '#A8A8A8', top: 594,alignItems:'center'}}> لا تملك حساب حتى الأن؟  </Text>
                    </View>
                {/* <View style={{width: 2, height: '100%', backgroundColor: 'red', left: 330}}>  
                </View>            */}
            </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    background_img: {
        position: 'absolute',
        width: 360,
        height: 220,
    },

    title1: {
        position: 'absolute',
        width: 288,
        height: 100,
        left: 54,
        top: 230,
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 24,
        lineHeight: 42,
        textAlign: 'right',
        color: '#292B56',
        flexDirection: 'row-reverse',
    },
    title2: {
        position: 'absolute',
        width: 400,
        height: 100,
        left: -58,
        top: 265,
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 24,
        lineHeight: 42,
        textAlign: 'right',
        color: '#292B56',
        flexDirection: 'row-reverse',
    },

    username_titel: {
        position: 'absolute',
        width: 101,
        height: 34,
        left: 230,
        top: 310,
        fontFamily: 'Bold',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 34,
        textAlign: 'right',
        color: '#292B56',
        mixblendmode: 'normal',
    },

    input: {
        position: 'absolute',
        width: '90%',
        height: 42,
        left: 16,
        top: 340,
        backgroundColor: '#F6F7FC',
        fontFamily: 'Small',
        fontSize: 13,
        padding: 10,
    },

    button: {
        width: '90%',
        height: 60,
        left: '5%',
        top: 570,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});