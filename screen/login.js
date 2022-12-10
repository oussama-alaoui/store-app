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



export default function Login() {
    const [Number, setNumber] = useState();
    const [username, setUsername] = useState("");
    let [fontsLoaded] = useFonts({
       Small: require("../assets/fonts/Almarai-Light.ttf"),
       Bold: require("../assets/fonts/Almarai-Bold.ttf"),
       X_Bold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
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
                        colors={['#00000000', '#ffffff']} 
                        style={{height : '100%', width : '100%'}}>



                    </LinearGradient>

                </ImageBackground>
                <Text style={styles.title1}>السلام عليكم، </Text>
                <Text style={styles.title2}>المرجو تسجيل الدخول</Text>

                <Text style={styles.username_titel}>إسم المستخدم</Text>
                <TextInput
                    style={[styles.input, {borderRadius: 15}]}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="username"
                    keyboardType="ascii-mode"
                />


                <Text style={[styles.username_titel, {top: 420}]}>رقم الهاتف</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', top: 450}}>
                     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '15%', height: 52, backgroundColor: '#F3F4F9',borderTopLeftRadius: 15,borderBottomLeftRadius: 15, left: 34}}>
                         <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 20,}}>+966</Text>
                     </View>
                     <TextInput
                         style={[styles.input, {top: 0, width: '75%', left: 80, borderTopRightRadius: 15, borderBottomRightRadius: 15}]}
                         onChangeText={setNumber}
                         value={Number}
                         placeholder=" 12 345 6789"
                         keyboardType="numeric"
                     />
                </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setNumber(0)}
                    >
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 20, color: 'white'}}>تسجيل الدخول</Text>
                    </TouchableOpacity> 
                    <View style={{flexDirection: 'row', left: 75}}>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'black', top: 570,alignItems:'center'}} onPress={() => {setNumber(0) 
                        return <Register/>}}> سجل </Text>
                        <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 16, color: 'black', top: 570,alignItems:'center'}}> لا تملك حساب حتى الأن؟  </Text>
                    </View>                      
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
        left: 65,
        top: 230,
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 25,
        lineHeight: 42,
        textAlign: 'right',
        color: '#292B56',
        flexDirection: 'row-reverse',
    },
    title2: {
        position: 'absolute',
        width: 400,
        height: 100,
        left: -47,
        top: 265,
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 25,
        lineHeight: 42,
        textAlign: 'right',
        color: '#292B56',
        flexDirection: 'row-reverse',
    },

    username_titel: {
        position: 'absolute',
        width: 101,
        height: 34,
        left: 250,
        top: 320,
        fontFamily: 'Small',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 34,
        textAlign: 'right',
        color: '#292B56',
        mixblendmode: 'normal',
    },

    input: {
        position: 'absolute',
        width: 320,
        height: 52,
        left: 30,
        top: 350,
        backgroundColor: '#F3F4F9',
        fontFamily: 'Small',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        padding: 10,
    },

    button: {
        width: '90%',
        height: 60,
        left: '5%',
        top: 560,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});