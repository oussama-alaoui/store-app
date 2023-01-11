import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Image, Dimensions} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { StatusBar } from "expo-status-bar";
const { width, height } = Dimensions.get('window');




export default function Login({navigation}) {
    // useEffect(() => {
    //     getData()
    // }, [])
    const [value, setValue] = useState('')


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
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background_img}
                    source={require('../assets/login_background.jpeg')}>
                    <LinearGradient 
                        colors={['#0000001d', '#ECECFFDD']} 
                        style={{height : '100%', width : '100%'}}>
                    </LinearGradient>

                </ImageBackground>
                <View style={{paddingTop:35, marginHorizontal:30}}>
                    <Text style={styles.title1}>السلام</Text>
                    <Text style={styles.title1}>المرجو تسجيل الدخول</Text>
                    <Text style={styles.input_label}>إسم المستخدم</Text>
                    <TextInput
                        style={[styles.input, {borderRadius: 10}]}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        keyboardType="ascii-mode"
                        placeholderTextColor="rgba(0,0,0, 0.25)" 
                    />
                    <Text style={[styles.input_label]}>رقم الهاتف</Text>
                    <View style={{ position:'relative'}}>
                        <Text style={{fontFamily: 'Bold',fontSize: 13, position:'absolute', top: 12, left: 10, color: '#000000', zIndex:10}}>+966</Text>
                        <TextInput
                            style={[styles.input_phone, {borderRadius: 10}]}
                            onChangeText={setNumber}
                            value={Number}
                            placeholder=" 12 345 6789"
                            keyboardType="numeric"
                            placeholderTextColor="rgba(0,0,0, 1)" 
                        />
                    </View>
                    
                </View>
                {/* <View style={{width: 2, height: '100%', backgroundColor: 'red', left: 330}}>  
                </View>            */}
                <View style={{position:'absolute', bottom: 20, width:width - 60, left: 30}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => input_check()}
                    >
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}>تسجيل الدخول</Text>
                    </TouchableOpacity> 
                    <View style={{flexDirection: 'row', justifyContent:'center', marginTop:17}}>
                        <Text style={{fontFamily: 'Black',fontSize: 13, color: '#7E7E7E',alignItems:'center'}} onPress={() => navigation.navigate('Register')}>سجل</Text>
                        <Text style={{fontFamily: 'Bold',fontSize: 12, color: '#A8A8A8',alignItems:'center'}}> لا تملك حساب حتى الأن؟  </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );    

    async function input_check(){
        await fetch("https://newapi.mediaplus.ma/api/v1/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "phone": Number,
                "username": username,
            })
        })
        .then((response) => response.json())
        .then((json) => {
            setValue(json)
            console.log(json)
            if (json.status == true){
                navigation.navigate('Verification_phone', {id: json.info.id})
            }
        })
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },

    background_img: {
        width: width,
        height: 220 * width / 360,
    },

    title1: {
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 24,
        textAlign: 'right',
        color: '#292B56',
        fontWeight: 'Bold',
        flexDirection: 'row-reverse',
    },

    input_label: {
        fontFamily: 'Bold',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        marginTop: 25,
        lineHeight: 34,
        textAlign: 'right',
        color: '#292B56',
        mixblendmode: 'normal',
    },

    input: {
        width: '100%',
        backgroundColor: '#F6F7FC',
        fontFamily: 'Small',
        fontSize: 13,
        padding: 10,
    },

    input_phone: {
        width: '100%',
        backgroundColor: '#F6F7FC',
        fontFamily: 'Small',
        fontSize: 13,
        paddingLeft: 45,
        paddingVertical: 10,
        paddingRight: 10,
    },

    button: {
        width: '100%',
        marginTop: 10,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});