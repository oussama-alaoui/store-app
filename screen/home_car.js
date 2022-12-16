import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView } from "react-native-web";

 export default function Home_cars () {

    const [Number, setNumber] = useState();
    const [category, setCategory] = useState(1);
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/Almarai-Light.ttf"),
        Bold: require("../assets/fonts/Almarai-Bold.ttf"),
        X_Bold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
     });
     if (!fontsLoaded) {
         return <Text>Loading...</Text>;
     }
     const arr = [
            {fav: 1, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'محمد', price: 1000, price_now: 2500, max: 5000, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'}
        ]

    return(
        console.log(category),
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.top}>
                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]}
                        onPress={() => setCategory(3)}
                        disable={false}
                    >
                        <Image source={require('../assets/moto.png')} style={{width: '80%', top: '16%'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]} 
                        onPress={() => setCategory(2)}    
                    >
                        <Image source={require('../assets/camion.png')} style={{width: '80%'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]}
                        onPress={() => setCategory(1)}
                    >
                        <Image source={require('../assets/car.png')} style={{width: '80%'}}/>
                    </TouchableOpacity>
                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={{width: '23%', height: 37, backgroundColor: '#ECEFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginRight:53, marginLeft: 13, flexDirection: 'row', justifyContent: 'space-around', borderColor: '#C7C9F9', borderWidth: 2}}>
                         <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3'}}>إضافة إعلان</Text>
                         <Image source={require('../assets/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '11%', height: 37, backgroundColor: '#F9F9FE', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight:15 }}>
                        <Image source={require('../assets/filter.png')}/>
                    </TouchableOpacity>
                    <View style={{width: '40%', height: 37, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                                <TextInput
                                    style={[styles.input, {top: 0, width: '75%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#F3F4F9', writingDirection: "ltr", padding: 10, fontSize: 12, fontFamily: 'Small'}]}
                                    onChangeText={setNumber}
                                    value={category}
                                    letterSpacing={2}
                                    maxLength={10}
                                    placeholder=" البحث برقم الإعلان"
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', height: 37, backgroundColor: '#e1e1e3',borderTopRightRadius: 10,borderBottomRightRadius: 10,}}>
                                    <Image source={require('../assets/search.png')}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            
            <ScrollView>
                <View style={styles.body}>
                    <View style={{width: '95%', height: '24%', backgroundColor: '#fff', borderRadius: 10, marginTop: 10, justifyContent: 'space-around', flexDirection: 'row'}}>
                            
                            {/* 1st colum */}
                            <View style={{width: '20%', height: '86%', borderRadius: 10, top: '6%', left: 5}}>
                                <View style={{width: '100%', height: '50%'}}>
                                <Image source={require('../assets/aimer.png')} style={{width: 20, height: 20}}/>
                                </View>
                                <View style={{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 2}}>
                                    <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>لا يوجد</Text>
                                    <View style={{width: 2, height: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                    <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                </View>
                            </View>
                            
                            {/* 2st colum */}
                            <View style={{width: '35%', height: '80%', borderRadius: 10, top: '5%'}}>
                                <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
                                <View style={{width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center', top: 16, left: 0}}>
                                        <Text style={{fontSize: 15, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3', right: 22, top:7}}>أسامة العلوي</Text>
                                </View>
                                <Image source={require('../assets/user_1.png')} style={{width: 47, height: 50, resizeMode: 'contain', right: 22}}/>
                                </View>
                                
                                <View style={{width: '100%', height: '50%', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <View style={{width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'space-around', top: 10}}>
                                        <Text style={{fontSize: 10, fontFamily: 'X_Bold', color: 'black', left: 28}}>الرياض</Text>
                                        <Text style={{fontSize: 10, fontFamily: 'Bold', color: 'gray', left: 4}}>المدينة :</Text>
                                    </View>
                                    <View style={{width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <Text style={{fontSize: 10, fontFamily: 'X_Bold', color: '#9597DF', left: 15}}>350-50 ريال</Text>
                                        <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: 'gray'}}>سعر  :</Text>
                                    </View>
                                </View>
                            </View>

                            {/* 3st colum */}
                            <View style={{width: '40%', height: '65%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', top: '9%'}}>
                                <Image source={require('../assets/plate_car1.png')} style={{width: 110, height: 30, resizeMode: 'contain'}}/>
                            </View>
                    </View>
                
                    
                
                        {arr.map((item, index) => {
                            return (

                                <View style={{width: '95%', height: '24%', backgroundColor: '#fff', borderRadius: 10, top: '2%', justifyContent: 'space-around', flexDirection: 'row'}}>
                                        
                                        {/* 1st colum */}
                                        <View style={{width: '20%', height: '86%', borderRadius: 10, top: '6%', left: 5}}>
                                            <View style={{width: '100%', height: '50%'}}>
                                            <Image source={require('../assets/aimer.png')} style={{width: 20, height: 20}}/>
                                            </View>
                                            <View style={{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 2}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}> {item.max}</Text>
                                                <View style={{width: 2, height: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                                <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                            </View>
                                        </View>
                                        
                                        {/* 2st colum */}
                                        <View style={{width: '35%', height: '80%', borderRadius: 10, top: '5%'}}>
                                            <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
                                            <View style={{width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center', top: 16, left: 0}}>
                                                    <Text style={{fontSize: 15, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3', right: 22, top:7}}>{item.user} </Text>
                                            </View>
                                            <Image source={require('../assets/user_1.png')} style={{width: 47, height: 50, resizeMode: 'contain', right: 22}}/>
                                            </View>
                                            
                                            <View style={{width: '100%', height: '50%', justifyContent: 'space-around', alignItems: 'center'}}>
                                                <View style={{width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'space-around', top: 10}}>
                                                    <Text style={{fontSize: 10, fontFamily: 'X_Bold', color: 'black', left: 28}}>{item.city}</Text>
                                                    <Text style={{fontSize: 10, fontFamily: 'Bold', color: 'gray', left: 4}}>المدينة :</Text>
                                                </View>
                                                <View style={{width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                    <Text style={{fontSize: 10, fontFamily: 'X_Bold', color: '#9597DF', left: 15}}>{item.price_now}-{item.price} ريال</Text>
                                                    <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: 'gray'}}>سعر  :</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* 3st colum */}
                                        <View style={{width: '40%', height: '65%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', top: '9%'}}>
                                            <Image source={require('../assets/plate_car1.png')} style={{width: 110, height: 30, resizeMode: 'contain'}}/>
                                        </View>
                                </View>
                            )
                            
                        })
                        }

                </View>
            </ScrollView>
            
        </View>
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
        height: 170,
        top: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    top: {
        width: '100%',
        height: 80,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    bottom: {
        width: '100%',
        height: 60,
        top: 10,
        flexDirection: 'row',
    },

    body: {
        width: '100%',
        height: '90%',
        top: 5,
        backgroundColor: '#F0F0FF',
        alignItems: 'center',
    },

    box_category: {
        width: '26%', 
        height: 80, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 7
    },

    shadow_category: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});
