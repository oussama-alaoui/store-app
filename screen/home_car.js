import React, { useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Matricule from './svg_assets/matricule'
import { get } from "react-native/Libraries/Utilities/PixelRatio";

 export default function Home_cars ({navigation}) {

    const { width } = Dimensions.get('window');
    const [Number, setNumber] = useState();
    const [Loading, setLoading] = useState(true);
    const [category, setCategory] = useState(2);
    const [articles, setArticles] = useState([{}]);
    const [favorites, setFavorites] = useState([{}]);
    const [city, setCity] = useState("");
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
     });
     const [svgSource, setSvgSource] = useState(null);
     const [isLogin, setIsLogin] = React.useState("");

    async function fetchData() {
    console.log(category);
    await fetch(`https://newapi.mediaplus.ma/api/v1/articles/type/${category}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        })
    .then((response) => response.json())
    .then((responseJson) => {
        setArticles(responseJson.data.data);
        var filteredArray = responseJson.favorite.filter(function(itm){
            return itm.from_id == 1;
        });
        setFavorites(filteredArray);
        setLoading(false);
        // console.log("omarrr", filteredArray);
    })
    .catch((error) => {
        console.warn(error);
    });
    }
    useEffect(() => {
        fetchData();
    }, [category]);
     if (!fontsLoaded) {
         return <Text>Loading...</Text>;
     }
    
    if(Loading){
        return <></>
    }
    else{
        return(
            console.log(category),
            <SafeAreaView style={{flex: 1}}>
                <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.top}>
                            <TouchableOpacity style={category == 0 ? styles.box_category_active : styles.box_category_inactive}
                                onPress={() => setCategory(0)}
                                disable={false}
                            >
                                <Image source={require('../assets/moto.png')} style={{width: '80%', top: '16%'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={category == 1 ? styles.box_category_active : styles.box_category_inactive} 
                                onPress={() => setCategory(1)}    
                            >
                                <Image  source={require('../assets/camion.png')} style={{width: '80%'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={category == 2 ? styles.box_category_active : styles.box_category_inactive}
                                onPress={() => setCategory(2)}
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
                    
                    <ScrollView horizontal='true' style={{flex:1}} overScrollMode="never">
                        <View style={styles.body}>
                            {articles.length > 0 ?(
                                articles.map((item, index) => {
                                        return (console.log('article id : ' + item.id,favorites.find(el => el.article_id === item.id)),
                                            <TouchableOpacity key={index} style={{width: '95%', height: 120, backgroundColor: '#fff', borderRadius: 10, marginTop: 10, justifyContent: 'space-around', flexDirection: 'row', flex: 1, marginBottom: 10}} onPress={() => navigation.navigate('Product_detail', {product_id: item.id})}> 
                                                    {/* 1st colum */}
                                                    <View style={{width: '20%', height: '86%', borderRadius: 10, top: '3%', left: 5}}>
                                                        <View style={{width: '100%', height: '50%'}}>
                                                        
                                                        
                                                        {
                                                            favorites.find(el => el.article_id === item.id) != undefined ?
                                                                <Image source={require('../assets/aimer.png')} style={{width: 20, height: 20}}/>
                                                            :
                                                                <Image source={require('../assets/heart.png')} style={{width: 20, height: 20}}/>
                                                        }
                                                        
                                                        </View>
                                                        <View style={{width: '110%', height: '24%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#5E66EE', justifyContent: 'space-around', top: 16, borderRadius: 5}}>
                                                        <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}> {item.max} ريال</Text>
                                                            <View style={{width: 2, height: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}></View>
                                                            <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#fff'}}>الحد</Text>
                                                        </View>
                                                    </View>
                                                    
                                                    {/* 2st colum */}
                                                    <View style={{width: '35%', height: '80%', borderRadius: 10, top: '2%'}}>
                                                        <View style={{width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        <View style={{width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                                                                <Text style={{fontSize: 13, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3'}}>{item.client_id.username}</Text>
                                                        </View>
                                                        <Image source={require('../assets/user_1.png')} style={{width: 47, height: 50, resizeMode: 'contain', right: 16}}/>
                                                        </View>
                                                    
                                                        <View style={{width: '100%', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
                                                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                                <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: 'black'}}>{item.city_id.city_name}</Text>
                                                                <Text style={{fontSize: 12, fontFamily: 'Small', color: 'gray',}}>المدينة </Text>
                                                            </View>
                                                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                                <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF'}}>{item.price}-{item.price} ريال</Text>
                                                                <Text style={{fontSize: 12, fontFamily: 'Small', letterSpacing: 2, color: 'gray'}}>السعر </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    {/* 3st colum */}
                                                    <View style={{width: '36%', height: '50%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', top: '10%',}}>
                                                        
                                                        <Matricule
                                                            style={item.style} // basic_00 to basic_06, public_00 to public_01, motor
                                                            type='listing' // detail, listing
                                                            alpha={item.en_alpha}
                                                            number={item.en_numbers}
                                                        />
                                                    </View>

                                            </TouchableOpacity>
                                        )
                                })
                            )
                            :
                            (
                                <>
                                <Text>no data</Text>
                                </>
                            )}
                                
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
