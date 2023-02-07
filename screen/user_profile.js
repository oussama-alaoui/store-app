import React, { useEffect } from "react";
import { Alert, ImageBackground, SafeAreaView, Dimensions } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Matricule from './svg_assets/matricule'
import { Modal } from "react-native";
import  Rating from 'react-native-easy-rating';
import { GetData } from "./Syncstorage";
import { db, collection, getDocs, query, addDoc, where } from "../firebase";
import Loadings from "./complement/loadings";

export default function User_Profile({navigation, route}) {
    const   { width, height } = Dimensions.get('window');
    const   [user_detail, setUser_detail] = useState({});
    const   [all_products, setAll_products] = useState([]);
    const   [loading, setLoading] = useState(true);
    const   [modalVisibleRepo, setModalVisibleRepo] = useState(false);
    const   [modalVisibleFeed, setModalVisibleFeed] = useState(false);
    const   [user_id, setUser_id] = useState(0);
    useEffect(() => {
        fetch(`https://newapi.mediaplus.ma/api/v1/clients/${route.params.user_id}`, 
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
        fetch(`https://newapi.mediaplus.ma/api/v1/articles/user/${route.params.user_id}`, 
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
    useEffect(() => {
        GetData('user_id').then((res) => {
            setUser_id(res)
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
        const ModalReport = () => {
            const   [inputValue, setInputValue] = useState('');
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleRepo}
                    onRequestClose={() => {
                    setModalVisibleRepo(!modalVisibleRepo);
                    }} style={{height: "100%", width: "100%", position: "absolute"}}>
                    <View style={{height: "100%", width: "100%", backgroundColor: "rgba(52, 52, 52, 0.3)", justifyContent:"center"}}>
                    <View style={{marginHorizontal: 20, backgroundColor: "#fff", borderRadius: 20}}>
                        <Text style={{paddingTop: 30, textAlign: "center", fontFamily: "Bold", fontSize: 20}}>تقديم إبلاغ على الحساب</Text>
                        {/* <Text style={{paddingVertical: 5, textAlign: "center", color: "red", marginHorizontal: 30}}>اللوحات المعروضة</Text> */}
                        <TextInput
                            style={{height: 120, marginHorizontal: 30, borderRadius: 10, marginVertical: 30, elevation: 2, shadowColor: 'black', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',}}
                            onChangeText={text => setInputValue(text)}
                            defaultValue={inputValue}
                            placeholder="الرجاء كتابة الرسالة"
                            multiline={true}
                            numberOfLines={4}
                        />
                        <TouchableOpacity style={{height: 40, marginHorizontal: 30, borderRadius: 10, marginBottom: 30, backgroundColor: '#678DF9', justifyContent: 'center', alignItems: 'center'}} onPress={() => post_repot(inputValue)}>
                            <Text style={{fontFamily: 'Bold', fontSize: 16, color: "#fff"}}>إرسال</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                </Modal>
            );
        }
        const ModalFeedback = () => {
            const   [comment, setComment] = useState('');
            const   [rate, setRate] = useState(0);
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleFeed}
                    onRequestClose={() => {
                        setModalVisibleFeed(!modalVisibleFeed);
                    }} style={{height: "100%", width: "100%", position: "absolute"}}>
                    <View style={{height: "100%", width: "100%", backgroundColor: "rgba(52, 52, 52, 0.3)", justifyContent:"center"}}>
                    <View style={{marginHorizontal: 20, backgroundColor: "#fff", borderRadius: 20}}>
                        <Text style={{paddingTop: 30, textAlign: "center", fontFamily: "Bold", fontSize: 20}}> تقييم</Text>
                        <Rating
                            rating={rate}
                            max={5}
                            onRate={setRate}
                            iconWidth={32}
                            iconHeight={32}
                            style={{paddingTop:10, justifyContent:'center'}}
                        />
                        <TextInput
                            style={{height: 60, marginHorizontal: 30, borderRadius: 10, marginVertical: 20, elevation: 2, shadowColor: 'gary', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',}}
                            onChangeText={text => setComment(text)}
                            defaultValue={comment}
                            placeholder="الرجاء كتابة الرسالة"
                            multiline={true}
                            numberOfLines={4}
                        />
                        <TouchableOpacity style={{height: 40, marginHorizontal: 30, borderRadius: 10, marginBottom: 30, backgroundColor: '#678DF9', justifyContent: 'center', alignItems: 'center'}} onPress={() => post_feedback(comment, rate)}>
                            <Text style={{fontFamily: 'Bold', fontSize: 16, color: "#fff"}}>إرسال</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                </Modal>
            );
        }
        return (
            console.log(route.params.user_id),
            
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
                <ModalReport/>
                <ModalFeedback/>
                <View style={styles.header}>
                    <View style={styles.top}>
                        <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => navigation.goBack()}>
                            <Image source={require("../assets/back.png")} style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                        <View style={{width: 100, height: 40, justifyContent: 'space-around', alignItems: 'center', borderRadius: 13, flexDirection: 'row'}}>
                            <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => setModalVisibleRepo(true)}>
                                <Image source={require('../assets/declaration.png')} style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 13}} onPress={() => setModalVisibleFeed(true)}>
                                <Image source={require('../assets/heart.png')} style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{position: 'absolute', width: '100%',alignItems:'center', marginTop:85}}>
                    <View style={{width: 120, height: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderColor: '#4D62EE', borderWidth: 5, borderRadius: 13}}>
                        <Image source={require('../assets/user_1.png')} style={{width: '90%', height: '90%'}}/>
                    </View>
                    <View style={{width: '100%', position: 'absolute', marginTop:70}}>
                        <View style={{width:(width - 120)/2, alignItems:'center'}}>
                            <TouchableOpacity style={{width: 110, height: 24, alignItems: 'center', flexDirection: 'row',justifyContent: 'space-between'}}
                                onPress={() => navigation.navigate('UserReview', {user_id: route.params.user_id})}
                            >
                                <Image source={require('../assets/star_active.png')} style={{width: 18, height: 18}}/>
                                <Image source={require('../assets/star_active.png')} style={{width: 18, height: 18}}/>
                                <Image source={require('../assets/star_active.png')} style={{width: 18, height: 18}}/>
                                <Image source={require('../assets/star_active.png')} style={{width: 18, height: 18}}/>
                                <Image source={require('../assets/star_inactive.png')} style={{width: 18, height: 18}}/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop : 55, marginBottom : 10}}>
                    <Text style={{fontFamily: 'Bold', fontSize: 21, color: '#292B56', paddingVertical:3}}>{user_detail.username}</Text>
                    <TouchableOpacity style={{backgroundColor: '#678DF9', borderRadius: 13, paddingHorizontal: 25, paddingVertical: 5}} onPress={() => checkAndCreateRoom(user_id, route.params.user_id)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 16, color: '#fff'}}>الرسائل</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1FBFF'}}>
                        <View style={{width: '90%', justifyContent: 'space-between', margin: 10, writingDirection: 'rtl'}}>
                            <Text style={{fontFamily: 'Bold', fontSize: 14, color: '#000000', writingDirection: 'rtl'}}>اللوحات المعروضة</Text>
                        </View>
                    <ScrollView horizontal='true' overScrollMode="never">
                        <View style={styles.body}>
                            {all_products.data.map((item, index) => {
                                const date = new Date(item.created_at);
                                const fulldate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                return (
                                    console.log("here"),
                                    <TouchableOpacity key={index} style={{width: '92%', height: 101, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, flex: 1, marginRight: "5%"}} onPress={() => navigation.navigate('Product_detail', {product_id: item.id})}>
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
    function post_repot(inputValue){
        fetch('https://newapi.mediaplus.ma/api/v1/reports', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from_id: 2,
                to_id: route.params.user_id,
                details: inputValue,
            }
            )
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status == true){
                Alert.alert(
                    "تم الإبلاغ",
                    "تم إرسال الإبلاغ بنجاح",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                setModalVisibleRepo(false);
            }
        }
        )
    }
    function post_feedback(comment, rating){
        fetch('https://newapi.mediaplus.ma/api/v1/reviews', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from_id: 2,
                to_id: route.params.user_id,
                rating: rating,
                details: comment,
            }
            )
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status == true){
                Alert.alert(
                    "   تم التقييم",
                    "تم إرسال التقييم بنجاح",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                setModalVisibleFeed(false);
            }
        }
        )
    }

    
    
    async function checkAndCreateRoom (buyerId, sellerId) {
        // check if room exists
        const roomsCol = collection(db, 'rooms');
        const q = query(roomsCol, where('user1', '==', buyerId), where('user2', '==', sellerId), where('user1', '==', sellerId), where('user2', '==', buyerId));
        const querySnapshot = await getDocs(roomsCol);
        if (querySnapshot.empty) {
            // create room
            const newRoomRef = await addDoc(collection(db, 'rooms'), {
                user1: buyerId,
                user2: sellerId,
                messages: [],
            });
            console.log('Room created with ID: ', newRoomRef.id);
            navigation.navigate('ChatScreen', {room_id: newRoomRef.id});
        } else {
            // room exists
            console.log('Room exists');
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                navigation.navigate('ChatScreen', {room_id: doc.id});
            }
            );
        }
    };

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 150,
        backgroundColor: '#4D62EE',
        alignItems: 'center',
    },

    top: {
        width: '94%',
        marginTop: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bottom: {
        top: 0,
        width: '94%',
        height: '25%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor:'orange'
    },

    body: {
        marginBottom: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 'auto',
        alignItems: 'center',
    },
});




