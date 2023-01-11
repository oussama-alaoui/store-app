import React, { useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import RemoteSvg from 'react-native-remote-svg';

 export default function Home_cars ({navigation}) {

    const { width } = Dimensions.get('window');
    const [Number, setNumber] = useState();
    const [category, setCategory] = useState(1);
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
     });
     const [svgSource, setSvgSource] = useState(null);

    useEffect(() => {
    fetch('https://newapi.mediaplus.ma/storage/plates/public-00.svg?number=5555&alpha=ABB&ff=5555')
      .then((response) => response.text())
      .then((svgString) => {
        const dataUri = `data:image/svg+xml;utf8,${svgString}`;
        setSvgSource({ uri: dataUri });
      });
  }, []);
     if (!fontsLoaded) {
         return <Text>Loading...</Text>;
     }
     const arr = [
            {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 501, city: 'الfdض', username: 'oussama', img: 'https://appapi.mediaplus.ma/storage/templates/old.svg?number=1546&alpha=AJT'},
            {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 502, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 503, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 504, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 505, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 506, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 1, user: 'أسامة العلوي', price: 100, price_now: 250, max: 507, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'},
            {fav: 0, user: 'أسامة العلوي', price: 100, price_now: 250, max: 508, city: 'الرياض', username: 'oussama', img: '../assets/plate_car1.png'}
        ]

    return(
        console.log(category),
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={styles.container}>
                <View style={styles.header}>

                    <View style={styles.top}>
                        <TouchableOpacity style={category == 3 ? styles.box_category_active : styles.box_category_inactive}
                            onPress={() => setCategory(3)}
                            disable={false}
                        >
                            <Image source={require('../assets/moto.png')} style={{width: '80%', top: '16%'}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={category == 2 ? styles.box_category_active : styles.box_category_inactive} 
                            onPress={() => setCategory(2)}    
                        >
                            <Image source={require('../assets/camion.png')} style={{width: '80%'}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={category == 1 ? styles.box_category_active : styles.box_category_inactive}
                            onPress={() => setCategory(1)}
                        >
                            <Image source={require('../assets/car.png')} style={{width: '80%'}}/>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.bottom}>
                        <TouchableOpacity style={{width: '23%', height: 37, backgroundColor: '#ECEFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginRight:50, marginLeft: 13, flexDirection: 'row', justifyContent: 'space-around', borderColor: '#C7C9F9', borderWidth: 2}} onPress={() => navigation.navigate('Add_product')}>
                            <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3'}}>إضافة إعلان</Text>
                            <Image source={require('../assets/plus.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '11%', height: 37, backgroundColor: '#F9F9FE', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight:15 }}>
                            <Image source={require('../assets/filter.png')}/>
                        </TouchableOpacity>
                        <View style={{width: '40%', height: 37, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                                    <TextInput
                                        style={[styles.input, {top: 0, width: '77%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#F3F4F9', writingDirection: "ltr", padding: 10, fontSize: 10, fontFamily: 'Bold'}]}
                                        onChangeText={setNumber}
                                        value={Number}
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
                
                <ScrollView horizontal='true' style={{flex:1}}>
                    <View style={styles.body}>
                            {arr.map((item, index) => {
                                return (
                                    
                                    console.log('here'),
                                    <TouchableOpacity style={{width: '95%', height: 120, backgroundColor: '#fff', borderRadius: 10, marginTop: 10, justifyContent: 'space-around', flexDirection: 'row', flex: 1, marginBottom: 10}} onPress={() => navigation.navigate('Product_detail')}>
                                            
                                            {/* 1st colum */}
                                            <View style={{width: '20%', height: '86%', borderRadius: 10, top: '3%', left: 5}}>
                                                <View style={{width: '100%', height: '50%'}}>
                                                <Image source={require('../assets/aimer.png')} style={{width: 20, height: 20}}/>
                                                </View>
                                                <View style={{width: '110%', height: '24%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 5}}>
                                                <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}> {item.max} ريال</Text>
                                                    <View style={{width: 2, height: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                                    <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                                </View>
                                            </View>
                                            
                                            {/* 2st colum */}
                                            <View style={{width: '40%', height: '80%', borderRadius: 10, top: '2%'}}>
                                                <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
                                                <View style={{width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center', top: 16, left: 0}}>
                                                        <Text style={{fontSize: 13, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3', right: 10, top:0}}>{item.user} </Text>
                                                </View>
                                                <Image source={require('../assets/user_1.png')} style={{width: 47, height: 50, resizeMode: 'contain', right: 16}}/>
                                                </View>
                                                
                                                <View style={{width: '100%', height: '58%', justifyContent: 'space-around', alignItems: 'center'}}>
                                                    <View style={{width: '100%', height: '38%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                        <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: 'black', left: 40}}>{item.city}</Text>
                                                        <Text style={{fontSize: 12, fontFamily: 'Small', color: 'gray', left: 12}}>المدينة </Text>
                                                    </View>
                                                    <View style={{width: '100%', height: '38%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                        <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF', left: 13}}>{item.price_now}-{item.price} ريال</Text>
                                                        <Text style={{fontSize: 12, fontFamily: 'Small', letterSpacing: 2, color: 'gray', left: 4}}>السعر </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* 3st colum */}
                                            <View style={{width: '36%', height: '50%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', top: '10%'}}>
                                            <RemoteSvg
                                                source={{ uri: 'https://newapi.mediaplus.ma/storage/plates/basic-00.svg?number=5555&alpha=ABZ&ff=23' }}
                                                onLoad={() => console.log('loaded!')}
                                                style={{ width: '100%', height: '90%' }}
                                                onError={(error) => console.log('error:', error)}
                                            />
                                            </View>
                                    </TouchableOpacity>
                                )
                                
                            })
                            }
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
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },

    top: {
        width: '100%',
        height: 90,
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
        height: 'auto',
        flex: 1,
        backgroundColor: '#F0F0FF',
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
