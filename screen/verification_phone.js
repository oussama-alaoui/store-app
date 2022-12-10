import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Verification_phone() {
    const [Number, setNumber] = useState();
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
            <View style={styles.big_box}>
                <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 24, top: '7%'}}>إدخل الرقم المرسل</Text>
                <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 11, top: '7%', color: '#A8A6A6'}}>المرجو إدخال الرمز المرسل لرقم الهاتف</Text>
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
                    letterSpacing={39}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(Number) => setNumber(Number)}
                    value={Number}
                 />
                 <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 14, top: '53%', color: '#182EF4'}}>إعادة إرسال الرمز</Text>

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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    big_box: {
        position: 'absolute',
        width: 304,
        height: 471,
        borderRadius: 39,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    input_box: {
        position: 'absolute',
        width: 270,
        height: 79,
        top: '47%',
        borderRadius: 17,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        fontFamily: 'Small',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 25,
        padding: 10,
        color: '#A8A6A6',
        
    }
});
