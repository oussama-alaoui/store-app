import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image, Dimensions} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import Loadings from "./complement/loadings";


const { width, height } = Dimensions.get('window');


export default function Register({navigation}, props) {
    const [Number, setNumber] = useState();
    const [value, setValue] = useState('')
    const [username, setUsername] = useState("");
    let [fontsLoaded] = useFonts({
       Small: require("../assets/fonts/NotoSansArabic-Thin.ttf"),
       Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
       X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
       Black: require("../assets/fonts/NotoSansArabic-Black.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={styles.container}>
                <View style={{flexDirection:'column', flex: 1,}}>
                    <ImageBackground
                        style={styles.background_img}
                        source={require('../assets/bg_register.jpg')}>
                        {/* <LinearGradient 
                            colors={['#0000001d', '#ECECFFaa']} 
                            style={{height : '100%', width : '100%'}}>
                        </LinearGradient> */}

                    </ImageBackground>
                    <View style={{paddingTop:35, marginHorizontal:30}}>
                        <Text style={styles.title}>
                            السلام عليكم،
                            {'\n'}
                            المرجو تسجيل الدخول
                        </Text>
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
                        <View style={{ position:'relative', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'Bold',fontSize: 13, position:'absolute', left: 10, color: '#000000', zIndex:1}}>+966</Text>
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
                    <View style={{width:width - 60, left: 30, zIndex:2, marginBottom: 15, flex: 1, marginTop: "11%"}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => input_check()}
                        >
                            <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}> إنشاء حساب</Text>
                        </TouchableOpacity> 
                        <View style={{flexDirection: 'row', justifyContent:'center', marginTop:17}}>
                            <Text style={{fontFamily: 'Black',fontSize: 13, color: '#7E7E7E',alignItems:'center'}} onPress={() => navigation.navigate('Login')}>تسجيل الدخول</Text>
                            <Text style={{fontFamily: 'Bold',fontSize: 12, color: '#A8A8A8',alignItems:'center'}}> هل لديك حساب؟ </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );

    async function input_check(){
        await fetch("https://newapi.mediaplus.ma/api/v1/clients", {
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
            console.log(json.data.id)
            if (json.status == true){
                navigation.navigate('Verification_phone', {id: value.data.id})
            }
        })
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position : 'relative',
        backgroundColor: '#fff',
    },

    background_img: {
        width: width,
        height: 220 * width / 360,
    },

    title: {
        fontFamily: "Bold",
        fontStyle: 'normal',
        fontSize: 24,
        lineHeight: 40,
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