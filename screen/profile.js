import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Matricule from './svg_assets/matricule'

export default function Profile({navigation, route}) {
    const arr = [
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 501, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 502, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 503, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 504, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 505, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 506, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 507, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 508, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'},
        {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 509, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.jpeg'}
    ]
    const [Number, setNumber] = useState(0);
    const   [user_detail, setUser_detail] = useState({});
    const   [all_products, setAll_products] = useState([]);
    const   [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        fetch(`https://newapi.mediaplus.ma/api/v1/clients/1`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setUser_detail(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
        
    }, [])
    useEffect(() => {
        fetch(`https://newapi.mediaplus.ma/api/v1/articles/user/1`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setAll_products(json.data)
                setLoading(false)
                console.log(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
        
    }, [])
    // const [Date, setDate] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    if (loading) {
        return <></>;
    }
    else {
    return (
        console.log(Number),
        
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={styles.header}>

                <View style={styles.top}>
                    <TouchableOpacity style={{width: '13%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../assets/logout.png')} style={{width: '45%', height: '53%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '13%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => navigation.navigate('Favorite_product')}>
                        <Image source={require('../assets/heart.png')} style={{width: '45%', height: '53%'}}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '33%', height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFf', borderRadius: 13, top: '40%'}}>
                    <Image source={require('../assets/user_1.png')} style={{width: '90%', height: '90%'}}/>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={{width: '30%', height: 30, alignItems: 'center', backgroundColor: '#fff', flexDirection: 'row',justifyContent: 'space-between'}}
                        onPress={() => navigation.navigate('UserReview', {user_id: user_detail.id})}
                    >
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_active.png')} style={{width: '15%', height: '55%'}}/>
                        <Image source={require('../assets/star_inactive.png')} style={{width: '15%', height: '55%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '30%', height: '75%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#678DF9', borderRadius: 13}} onPress={() => navigation.navigate("Pay_site")}>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#fff'}}>دفع للموقع</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: '20%', top: '30%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Bold', fontSize: 21, color: '#292B56'}}>أسامة العلوي</Text>
                    <TouchableOpacity style={{width: '30%', height: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#678DF9', borderRadius: 13, top: 10}} onPress={() => setNumber(3)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#fff'}}>الرسائل</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{width: '100%', height: '100%', top: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1FBFF'}}>
                    <View style={{width: '90%', height: '5%', justifyContent: 'space-between', margin: 10, flexDirection: 'row'}}>

                        <TouchableOpacity style={{width: 80, height: 30, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}} onPress={() => setNumber(3)}>
                            <Image source={require('../assets/plus.png')} style={{width: 16, height: 16}}/>
                            <Text style={{fontFamily: 'Small', fontSize: 14, color: '#0075FE'}}>إضافة لوحة</Text>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#000000'}}>اللوحات المعروضة</Text>

                    </View>
                <ScrollView horizontal='true'>
                    <View style={styles.body}>
                            {all_products.data.map((item, index) => {
                                const date = new Date(item.created_at);
                                const fulldate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                return (
                                    console.log("here"),
                                    <TouchableOpacity key={index} style={{width: '92%', height: 101, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, flex: 1, marginRight: "5%"}} onPress={() => navigation.navigate('Product_detail_my', {product_id: item.id})}>
                                    <View style={{width: '100%', height: '78%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                                    {/* 1st colum */}
                                                <View style={{width: '22%', height: '100%', borderRadius: 10, top: '5%'}}>
                                                    <View style={{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 4}}>
                                                    <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}> {item.max} ريال</Text>
                                                        <View style={{width: 2, height: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                                        <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                                    </View>
                                                
                                                </View>
                                                
                                                {/* 2st colum */}
                                                <View style={{width: '35%', height: '60%', borderRadius: 10, marginTop: "1%"}}>
                                                    <View style={{width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                                                        <View style={{width: '100%', height: '41%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                            <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: 'black', left: 29}}>الرياض</Text>
                                                            <Text style={{fontSize: 12, fontFamily: 'Small', color: 'gray', left: 12}}>المدينة </Text>
                                                        </View>
                                                        <View style={{width: '100%', height: '39%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                            <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF', left: 5}}>{item.price}-{item.price} ريال</Text>
                                                            <Text style={{fontSize: 12, fontFamily: 'Small', letterSpacing: 2, color: 'gray', left: 4}}>السعر </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                {/* 3st colum */}
                                                <View style={{width: '35%', height: '70%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Matricule
                                                        style={item.style} // basic_00 to basic_06, public_00 to public_01, motor
                                                        type='listing' // detail, listing
                                                        alpha={item.en_alpha}
                                                        number={item.en_numbers}
                                                    />
                                                </View>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: '20%'}}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>{fulldate}</Text>
                                            <Image source={require('../assets/calendar.png')} style={{width: 13, height: 13, marginLeft: 3}}/>
                                        </View>
                                        <View style={{ flexDirection: 'row'}}>
                                            {item.type == 2 ?(
                                                <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>خصوصي</Text>
                                            ):(
                                                <></>
                                            )}
                                            {item.type == 1 ?(
                                                <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>نقل</Text>
                                            ):(
                                                <></>
                                            )}
                                            {item.type == 0 ?(
                                                <Text style={{fontFamily: 'Small',fontWeight: '600',fontSize: 10, color: '#A8A6A6'}}>دباب</Text>
                                            ):(
                                                <></>
                                            )}
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
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: '22%',
        backgroundColor: '#4D62EE',
        alignItems: 'center',
    },

    top: {
        width: '94%',
        height: '25%',
        top: '4%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bottom: {
        width: '94%',
        height: '25%',
        top: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    body: {
        marginBottom: '90%',
        width: '100%',
        flex: 1,
        height: 'auto',
        alignItems: 'center',
    },
});
