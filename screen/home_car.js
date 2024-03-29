import React, { useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput, RefreshControl } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Matricule from './svg_assets/matricule'
import { GetData } from "./Syncstorage";
import Loadings from "./complement/loadings";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

    var category1 = 2;
 export default function Home_cars ({navigation}) {

    const navigation2 = useNavigation();
    const [Loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState(category1);
    const [lastpage, setLastpage] = useState();
    const [articles, setArticles] = useState([{}]);
    const [favorites, setFavorites] = useState([{}]);
    const [client_id, setClient_id] = useState();
    const [ID, setID] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [loading2, setLoading2] = useState(false);

    // when open the app for the first time the category is 2

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
     });

    async function fetchData(value, page) {
    await fetch(`https://newapi.mediaplus.ma/api/v1/articles/type/${category1}?page=${page}`, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        setLastpage(responseJson.data.last_page_url.slice(-1));
        setArticles(responseJson.data.data);
        // console.log("user_id", value);
        var filteredArray = responseJson.favorite.filter(function(itm){
        return itm.from_id == value;
        });
        setFavorites(filteredArray);
        setLoading(false);
    })
    .catch((error) => {
        // console.warn(error);
    });
    }
    function getuser_id(){
        GetData("user_id").then((value) => {
            setClient_id(value);
            setLoading(true);
            while (1) {
                if (value != undefined) {
                    fetchData(value, 1);
                    break;
                }
            }
            
        });
    }
      
    useEffect(() => {
        GetData("user_id").then((value) => {
            setClient_id(value);
            getuser_id();
        });
        setPage(1);
    }, [category]);

    useEffect(() => {
        getuser_id();
    }, [navigation]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setPage(1);
        setTimeout(() => {
            getuser_id();
            setRefreshing(false);
        }, 2000);
    }, []);
    
     if (!fontsLoaded) {
        return <Loadings/>;
     }

     function convertPrice(price) {
        if (price > 999999999999999) {
            return (price / 1000000000000000) + "كواد";
        }
        else if (price > 999999999999) {
            return (price / 1000000000000) + "تريليون";
        }
        else if (price > 999999999) {
            return (price / 1000000000) + "مليار";
        }
        else if (price > 999999) {
            return (price / 1000000) + "مليون";
        }
        else {
            return price;
        }
    }

    const handleLoadMore = (event) => {
        // check if the user is at the end of the list
        var i = page;
        if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height && page <= lastpage) {
            console.log("page", page);
            setLoading2(true);
            setPage(page + 1);
            // append the data
            fetch(`https://newapi.mediaplus.ma/api/v1/articles/type/${category}?page=${i + 1}`, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setArticles(articles.concat(responseJson.data.data));
            }
            )
            .catch((error) => {
                // console.warn(error);
            }
            );
        }
        else{
            console.log("end", page);
        }
    }
    
    if(Loading)
        return <Loadings/>;
    else
        return(
            <SafeAreaView overScrollMode="never" style={{flex: 1}}>
                <ScrollView style={{flex:1}} overScrollMode="never"   refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} onScroll={(event) => handleLoadMore(event)}>
                <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.top}>
                            <TouchableOpacity style={category == 0 ? styles.box_category_active : styles.box_category_inactive}
                                onPress={() => {setCategory(0); category1 = 0}}
                                disable={false}
                            >
                                <Image source={require('../assets/moto.png')} style={{width: '80%', top: '16%'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={category == 1 ? styles.box_category_active : styles.box_category_inactive} 
                                onPress={() => {setCategory(1); category1 = 1}}    
                            >
                                <Image  source={require('../assets/camion.png')} style={{width: '80%'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={category == 2 ? styles.box_category_active : styles.box_category_inactive}
                                onPress={() => {setCategory(2); category1 = 2}}
                            >
                                <Image source={require('../assets/car.png')} style={{width: '80%'}}/>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.bottom}>
                            <TouchableOpacity style={{width: '23%', height: 37, backgroundColor: '#ECEFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginRight:50, marginLeft: 13, flexDirection: 'row', justifyContent: 'space-around', borderColor: '#C7C9F9', borderWidth: 2}} onPress={() => navigation.navigate('Add_product')}>
                                <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3'}}>إضافة إعلان</Text>
                                <Image source={require('../assets/plus.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: '11%', height: 37, backgroundColor: '#F9F9FE', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight:15 }} onPress={() => navigation.navigate('Search')}>
                                <Image source={require('../assets/filter.png')}/>
                            </TouchableOpacity>
                            <View style={{width: '40%', height: 37, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', height: 37, backgroundColor: '#e1e1e3',borderTopLeftRadius: 10,borderBottomLeftRadius: 10,}} onPress={() => searchNow()}>
                                            <Image source={require('../assets/search.png')}/>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={[styles.input, {top: 0, width: '77%', borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#F3F4F9', writingDirection: "ltr", padding: 10, fontSize: 10, fontFamily: 'Bold'}]}
                                            onChangeText={setID}
                                            value={ID}
                                            maxLength={10}
                                            placeholder=" البحث برقم الإعلان"
                                            keyboardType="numeric"
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                        <View style={styles.body}>
                            {articles.length > 0 ?(
                                articles.map((item, index) => {
                                        item.max = convertPrice(item.max);
                                        console.log("item", item.max);
                                        return (
                                            <TouchableOpacity key={index} style={{width: '95%', height: 120, backgroundColor: '#fff', borderRadius: 10, marginTop: 10, justifyContent: 'space-around', flexDirection: 'row', flex: 1, marginBottom: 10}} onPress={() => handeDetail(item.client_id.id, item.id)}>
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
                                                        <Text style={{fontSize: 10, fontFamily: 'Bold', color: '#fff'}}>
                                                            {
                                                                item.max ? 
                                                                    <>{item.max} <Text style={{fontSize: 10, color: '#fff'}}>﷼</Text></>
                                                                : "لايوجد"

                                                            }
                                                        </Text>
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
                                                        <Image source={{uri: item.client_id.photo ? `https://newapi.mediaplus.ma/storage/${item.client_id.photo}` : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}} style={{width: 30, height: 30, borderRadius: 50, top: 5, right: 7}}/>
                                                        </View>
                                                    
                                                        <View style={{width: '100%', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
                                                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                                <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: 'black'}}>{item.city_id.city_name}</Text>
                                                                <Text style={{fontSize: 12, fontFamily: 'Small', color: 'gray',}}>المدينة </Text>
                                                            </View>
                                                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                                <Text style={{fontSize: 12, fontFamily: 'X_Bold', color: '#9597DF'}}>{item.bid[0]?.bid_price || item.price} ريال</Text>
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

                
                    
                </View>
                {loading2 && <ActivityIndicator />}
                </ScrollView>
            </SafeAreaView>
        )
    

    function handeDetail(id, item_id) {
        if(client_id == id) {
            console.log('my product'+id + ' ' + client_id)
            navigation.navigate('Product_detail_my', {product_id: item_id})
        } else {
            console.log('other product'+id + ' ' + client_id)
            navigation.navigate('Product_detail', {product_id: item_id})
        }
    }

    function searchNow()
    {
        let args = "https://newapi.mediaplus.ma/api/v1/articles/search/"
        if (ID == "")
            args += "null/"
        else
            args += ID+"/null/null/null/"
        navigation.navigate('Search_results', {url: args})
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
        backgroundColor: 'rgba(177, 156, 217, 0.2)',
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