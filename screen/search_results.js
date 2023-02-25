import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Matricule from './svg_assets/matricule'
import Loadings from "./complement/loadings";
import { StatusBar } from "expo-status-bar";

export default function Search_results({navigation, route}) {
    const [all_products, setAll_products] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(route.params.url, 
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
                // console.log(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
        
    }, [])
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }
    if (loading) {
        return <Loadings/>;
    }
    else
    {
        return (console.log('omar', all_products.data.length),
        <View style={styles.container}>
        <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
        <View style={{height: 100, width: "100%"}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                <Image
                    style={{ width: 24, height: 24}}
                    source={require("../assets/back.png")}
                />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: "bold", color: "#000", top: 10, marginBottom: 0, textAlign: "center"}}>نتائج البحث</Text>
        </View>
        <ScrollView horizontal='true' overScrollMode="never" style={{width:"100%"}}>
                    <View style={styles.body}>
                        { all_products.data.length > 0
                        ?
                            all_products.data.map((item, index) => {
                                const date = new Date(item.created_at);
                                console.log(item)
                                const fulldate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                return (
                                    <TouchableOpacity key={index} style={{width: '94%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, flex: 1}} onPress={() => navigation.navigate('Product_detail', {product_id: item.id})}>
                                        <View style={{width: '100%', height: 90, borderRadius: 10, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                                        {/* 1st colum */}
                                                    <View style={{width: '22%', height: '100%', borderRadius: 10, top: '5%'}}>
                                                        <View style={{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 4}}>
                                                        <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}> {item.max ? item.max + "ريال" : "لايوجد"} </Text>
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
                                                                <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF', left: 5}}>{item.bid[0]?.bid_price || item.price} ريال</Text>
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
                            })
                        :
                            <Text style={{width: '90%', height: 200,textAlign:'center',borderRadius: 12, marginBottom: 10}}>لا توجد أي نتائج في هذا البحث</Text>
                        }
                        
                    </View>
        </ScrollView>
    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
        height: '100%',
    },
    button: {
        width: 45,
        height: 37,
        backgroundColor: '#f1f1f1',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        marginBottom: '90%',
        width: '100%',
        flex: 1,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

