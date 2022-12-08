import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";


export default function Login() {
    return (
            <View style={styles.container}>
                <Image source={require('../assets/login_background.jpeg')} style={styles.background_img}/>
                <Text style={styles.title}>السلام عليكم، المرجو تسجيل الدخول</Text>

                <Text style={styles.username_titel}>إسم المستخدم</Text>
                
                <View style={{width: 5, height: 40000, backgroundColor: 'red', left: 350}}></View>
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
        height: 260,
    },

    title: {
        position: 'absolute',
        width: 288,
        height: 100,
        left: 65,
        top: 290,
        fontFamily: "Noto Sans Arabic",
        fontStyle: 'normal',
        fontSize: 37,
        lineHeight: 42,
        textAlign: 'right',
        fontWeight: '700',
        color: '#292B56',
        flexDirection: 'row-reverse',
    },

    username_titel: {
        position: 'absolute',
        width: 101,
        height: 34,
        left: 250,
        top: 400,
        fontFamily: 'Noto Sans Arabic',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 34,
        textAlign: 'right',
        color: '#292B56',
        mixblendmode: 'normal',
    },

});