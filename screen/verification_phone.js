import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Verification_phone({navigation}) {
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
    function get_time () {
        setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }

    return (
        <View style={styles.container}>
            <View style={styles.big_box}>
                <Text style={{fontFamily: 'X_Bold',fontWeight: '600',fontSize: 24, top: '7%', color: '#001970'}}>إدخل الرقم المرسل</Text>
                <Text style={{fontFamily: 'Bold',fontSize: 11, top: '7%', color: '#9A9999'}}>المرجو إدخال الرمز المرسل لرقم الهاتف</Text>
                <View style={{
                    borderStyle: 'dashed',
                    borderWidth: 0.5,
                    borderRadius: 0.5,
                    borderColor: '#A8A6A6',
                    width: 304,
                    height: 1,
                    top: '14%'
                }}>
                </View>


                <TextInput
                    style={styles.input_box}
                    maxLength={5}
                    letterSpacing={35}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(Number) => setNumber(Number)}
                    value={Number}
                 />
                 <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 14, top: '53%', color: '#495BFA'}}>إعادة إرسال الرمز</Text>

                 <View style={{
                    borderStyle: 'dashed',
                    borderWidth: 0.5,
                    borderRadius: 0.5,
                    borderColor: '#A8A6A6',
                    width: 304,
                    height: 1,
                    top: '71%'
                }}>
                </View>

                <View style={{flexDirection: 'row', top: '97%', width: '100%', justifyContent: 'space-around'}}>
                    <View style={{ flexDirection: 'row' , top: '95%'}}>
                        <Image source={require('../assets/calendar.png')} style={{top: '80%', left: '10%', marginRight: 1}}/>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 10, top: '86%', left: '20%', color: '#A8A6A6'}}>person</Text>
                    </View>
                    <View style={{ flexDirection: 'row' , top: '95%'}}>
                        <Image source={require('../assets/clock.png')} style={{top: '81%', left: '10%', marginRight: 1}}/>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 10, top: '86%', left: '20%', color: '#A8A6A6'}}>person</Text>
                    </View>
                    <View style={{ flexDirection: 'row' , top: '95%'}}>
                        <Image source={require('../assets/user.png')} style={{top: '80%', left: '10%', marginRight: 1}}/>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 10, top: '86%', left: '20%', color: '#A8A6A6'}}>person</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('BottomTab', {screen: 'Home'})}
                    >
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 20, color: 'white'}}>تفعيل الحساب</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    big_box: {
        position: 'absolute',
        width: 304,
        height: 471,
        borderRadius: 39,
        backgroundColor: 'white',
        alignItems: 'center',
        top: '12%',
    },

    input_box: {
        position: 'absolute',
        width: 270,
        height: 79,
        paddingLeft: 20,
        top: '47%',
        borderRadius: 17,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        fontFamily: 'Bold',
        fontSize: 25,
        padding: 5,
        color: '#A8A6A6',
        
    },

    button: {
        width: 304,
        height: 60,
        top: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});
