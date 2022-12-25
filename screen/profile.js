import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

export default function Profile({navigation}) {
    const arr = [
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 501, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 502, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 503, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 504, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 505, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 506, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 507, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 508, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 509, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'}
    ]
    const [Number, setNumber] = useState(0);
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
        console.log(Number),
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <View style={styles.top}>
                    <TouchableOpacity style={{width: 45, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => setNumber(3)}>
                        <Image source={require('../assets/logout.png')} style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
                    <View style={{width: 45, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}}>
                        <Image source={require('../assets/heart.png')} style={{width: 20, height: 20}}/>
                    </View>
                </View>
                <View style={{width: 100, height: 103, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFf', borderRadius: 13, top: '40%'}}>
                    <Image source={require('../assets/user_1.png')} style={{width: 101, height: 103}}/>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={{width: 100, height: 30, alignItems: 'center', backgroundColor: '#fff', flexDirection: 'row',justifyContent: 'space-between'}}
                        onPress={() => setNumber(3)}
                    >
                        <Image source={require('../assets/star_active.png')} style={{width: 16, height: 16}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: 16, height: 16}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: 16, height: 16}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: 16, height: 16}}/>
                        <Image source={require('../assets/star_inactive.png')} style={{width: 16, height: 16}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 110, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#678DF9', borderRadius: 13}} onPress={() => setNumber(3)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#fff'}}>دفع للموقع</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 30, top: 39, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Bold', fontSize: 21, color: '#292B56'}}>أسامة العلوي</Text>
                    <TouchableOpacity style={{width: 110, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#678DF9', borderRadius: 13, top: 10}} onPress={() => setNumber(3)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#fff'}}>الرسائل</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{width: '100%', height: '100%', top: 190, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1FBFF'}}>
                    <View style={{width: '90%', height: 33, justifyContent: 'space-between', margin: 10, flexDirection: 'row'}}>

                        <TouchableOpacity style={{width: 80, height: 30, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}} onPress={() => setNumber(3)}>
                            <Image source={require('../assets/plus.png')} style={{width: 16, height: 16}}/>
                            <Text style={{fontFamily: 'Small', fontSize: 14, color: '#0075FE'}}>إضافة لوحة</Text>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#000000'}}>اللوحات المعروضة</Text>

                    </View>
                <ScrollView horizontal='true'>
                    <View style={styles.body}>
                        {arr.map((item, index) => {
                            return (
                                console.log("here"),
                                 <TouchableOpacity style={{width: '90%', height: 101, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, flex: 1}} onPress={() => setNumber(8)}>
                                <View style={{width: '100%', height: '78%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                                {/* 1st colum */}
                                            <View style={{width: '24%', height: '100%', borderRadius: 10, top: '7%'}}>
                                                <View style={{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 4}}>
                                                <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}> {item.max} ريال</Text>
                                                    <View style={{width: 2, height: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                                    <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                                </View>
                                            
                                            </View>
                                            
                                            {/* 2st colum */}
                                            <View style={{width: '35%', height: '89%', borderRadius: 10, top: '5%'}}>
                                                <View style={{width: '100%', height: '58%', justifyContent: 'space-around', alignItems: 'center'}}>
                                                    <View style={{width: '100%', height: '41%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                        <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: 'black', left: 29}}>{item.city}</Text>
                                                        <Text style={{fontSize: 12, fontFamily: 'Small', color: 'gray', left: 12}}>المدينة </Text>
                                                    </View>
                                                    <View style={{width: '100%', height: '39%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                        <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF', left: 5}}>{item.price_now}-{item.price} ريال</Text>
                                                        <Text style={{fontSize: 12, fontFamily: 'Small', letterSpacing: 2, color: 'gray', left: 4}}>السعر </Text>
                                                    </View>
                                                </View>
                                                
                                            </View>

                                            {/* 3st colum */}
                                            <View style={{width: '37%', height: '70%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image source={require('../assets/plate_car1.png')} style={{width: 100, height: 30, resizeMode: 'contain'}}/>
                                            </View>
                                </View>
                                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: '20%'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>الجمعة 28 شتنبر 2022</Text>
                                        <Image source={require('../assets/calendar.png')} style={{width: 13, height: 13, marginLeft: 3}}/>
                                    </View>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>خصوصي</Text>
                                        <Image source={require('../assets/filter.png')} style={{width: 15, height: 15, marginLeft: 3}}/>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>5 أشخاص</Text>
                                        <Image source={require('../assets/user.png')} style={{width: 15, height: 15, marginLeft: 3}}/>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

          
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 149,
        top: 26,
        backgroundColor: '#4D62EE',
        alignItems: 'center',
    },

    top: {
        width: '94%',
        height: 37,
        top: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bottom: {
        width: '94%',
        height: 45,
        top: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    body: {
        marginBottom: 340,
        width: '100%',
        flex: 1,
        height: 'auto',
        alignItems: 'center',
    },

    box_category_inactive: {
        width: '25%', 
        height: 90,
        opacity: 0.2,
        borderWidth: 2,
        borderColor: '#7E7E7E',
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 15
    },

    box_category_active: {
        width: '25%', 
        height: 90, 
        borderWidth: 2,
        borderColor: '#7E7E7E',
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 15

    },

    bar_navigation: {
        width: '100%',
        height: 60,
        backgroundColor: 'red',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        top: 10,
        borderRadius: 10,
    },
});
