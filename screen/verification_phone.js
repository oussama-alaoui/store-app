import React from "react";
import { StyleSheet, Text, View, Image, Dimensions} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StoreData } from "./Syncstorage";
import Loadings from "./complement/loadings";
import { useFocusEffect } from "@react-navigation/native";
import { GetData } from "./Syncstorage";

const { width, height } = Dimensions.get('window');

export default function Verification_phone({navigation, route}) {
    const [error, setError] = useState('')
    const [Number, setNumber] = useState('');
    const [value, setValue] = useState('')
    // const [Date, setDate] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    useFocusEffect( () => {
        GetData('user_id').then((res) => {
            console.log("here res -------"+res);
            if (res) {
                console.log("here true -------"+res);
                navigation.navigate('Bottom');
            }
        });
    });
        
    if (!fontsLoaded) {
        return <Loadings/>;
    }
    function get_time () {
        setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }

    return (
        
        <View style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={[styles.box_validation, {paddingTop : 30}]}>
                <Text style={{fontFamily: 'X_Bold',fontWeight: '600',fontSize: 18, color: '#001970'}}>إدخل الرقم المرسل</Text>
                <Text style={{fontFamily: 'Bold',fontSize: 9, color: '#9A9999'}}>المرجو إدخال الرمز المرسل لرقم الهاتف</Text>
                {
                    error == '' ? <View style={{marginTop:30,borderStyle: 'dashed',borderWidth: 1.5,borderColor: '#949393',opacity:.3, width: '100%',}}/> :
                    <>
                        <View style={{alignItems:'center', marginVertical: 15}}>
                            <Text style={{borderRadius: 20, fontWeight: 'bold', fontSize:14, paddingHorizontal: 20,paddingTop: 7, paddingBottom: 5, color:'black', backgroundColor:'rgba(255, 75, 0, .35)'}}>{error}</Text>
                        </View>
                        <View style={{marginTop:10,borderStyle: 'dashed',borderWidth: 1.5,borderColor: '#949393',opacity:.3, width: '100%',}}/>
                    </>
                }
                
                <TextInput
                    style={styles.input_box}
                    maxLength={5}
                    letterSpacing={35}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(Number) => setNumber(Number)}
                    value={Number}
                />
                <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 12, marginTop: 10, marginBottom: 10, color: '#495BFA'}}>إعادة إرسال الرمز</Text>

                <View style={{
                    marginTop:30,
                    borderStyle: 'dashed',
                    borderWidth: 1.5,
                    borderColor: '#949393',
                    opacity: .3,
                    width: '100%',
                }}></View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginVertical: 25}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Image source={require('../assets/calendar.png')} style={{marginRight: 1, width: 12, height: 12}}/>
                        <Text style={{fontWeight: '600',fontSize: 8, color: '#A8A6A6'}}> Thunsday, 22 August 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Image source={require('../assets/clock.png')} style={{marginRight: 1, width: 12, height: 12}}/>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 8, color: '#A8A6A6'}}> 15:00</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Image source={require('../assets/user.png')} style={{marginRight: 1, width: 12, height: 12}}/>
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 8, color: '#A8A6A6'}}> Person</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => input_check()}>
                        <Text style={{fontFamily: 'Bold',fontWeight: '400',fontSize: 14, color: 'white'}}>التاكيد</Text>
            </TouchableOpacity> 
        </View>
    )
    async function input_check(){
        setError("")
        if(Number == '')
        {
            setError('الرجاء إدخال رقم اتاكيد')
            return 
        }
        await fetch("https://newapi.mediaplus.ma/api/v1/verifySms", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'ar',
            },
            body: JSON.stringify({
                code: Number,
                id: route.params.id,
            })
        })
        .then((response) => response.json())
        .then((json) => {
            setValue(json)
            console.log(json)
            // if (json.status == true){
                StoreData('user_id', route.params.id)
                navigation.navigate('Bottom')
            // }
            // else
            // {
            //     setError(json.info)
            // }
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9',
        alignItems: 'center',
    },

    box_validation: {
        width: width - 40,
        borderRadius: 39,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 120,
    },

    input_box: {
        width: width - 90,
        height: 80,
        borderRadius: 17,
        backgroundColor: '#F3F4F9',
        alignItems: 'center',
        fontFamily: 'Bold',
        fontSize: 35,
        padding: 10,
        marginTop: 50,
        color: '#A8A6A6',
    },

    button: {
        marginTop: 75,
        width: width - 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});
