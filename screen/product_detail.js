import React, { useEffect } from "react";
import { Linking, Share } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Clipboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Matricule from './svg_assets/matricule'
import { Modal } from "react-native";
import { TextInput } from "react-native";
import { GetData } from "./Syncstorage";
import Loadings from "./complement/loadings";
import { db, collection, getDocs, query, addDoc, where } from "../firebase";

const { width, height } = Dimensions.get('window');


export default function Product_detail({ navigation, route })
{
    
    const [modalVisibleFeed, setModalVisibleFeed] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [product_bids, setProductBids] = useState(null)
    const [favoriteId, setFavoriteId] = useState(null)
    const [product_detail, setProduct_detail] = useState({})
    const [loading, setLoading] = useState(true)
    const [client_id, setClient_id] = useState(null)

    useEffect(() => {
        GetData('user_id').then((res) => {
            console.log("user_id", res)
            console.log("product_id", route.params.product_id)
            setClient_id(res)
            fetch(`https://newapi.mediaplus.ma/api/v1/favorites/article_id/${route.params.product_id}/from_id/${res}`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setIsLiked(json.result)
                console.log("isLiked", json.result)
                if (json.result == true)
                {
                    setFavoriteId(json.favorite_id)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        })
    }, [])
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
     });
     function fetchBids()
     {
        fetch(`https://newapi.mediaplus.ma/api/v1/bids/article_id/${route.params.product_id}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setProductBids(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
     }
     useEffect(() => {
        fetch(`https://newapi.mediaplus.ma/api/v1/articles/${route.params.product_id}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setProduct_detail(json.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
        })
        fetchBids()
     }, [route.params.product_id, true])
     if (!fontsLoaded) {
         return <Loadings/>;
     }
     const copyToClipboard = () => {
         Clipboard.setString('012548');
    }

    const ModalNewBid = () => {
        const   [bidPrice, setBidPrice] = useState('');
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
                    <Text style={{paddingTop: 30, textAlign: "center", fontFamily: "Bold", fontSize: 20}}>إضافة مزايدة</Text>
                    
                    <TextInput
                        style={{height: 60, marginHorizontal: 30, borderRadius: 10, marginVertical: 20, elevation: 2, shadowColor: '#aab8e6', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',}}
                        onChangeText={text => setBidPrice(text)}
                        keyboardType="numeric"
                        defaultValue={bidPrice}
                        placeholder="قيمة المزايدة"
                        multiline={false}
                    />
                    <TouchableOpacity style={{marginHorizontal: 30, paddingVertical: 15, borderRadius: 10, marginBottom: 30, backgroundColor: '#678DF9', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            if (bidPrice == '')
                            {
                                alert('الرجاء إدخال قيمة المزايدة')
                                return
                            }
                            if(product_bids.length > 0)
                            {
                                if (bidPrice < product_detail.price || bidPrice <= product_bids[0].bid_price)
                                {
                                    alert('الرجاء إدخال قيمة المزايدة أكبر من السعر الحالي')
                                    return
                                }
                            }
                            else
                            {
                                if (bidPrice < product_detail.price)
                                {
                                    alert('الرجاء إدخال قيمة المزايدة أكبر من السعر الحالي')
                                    return
                                }
                            }
                            var value = JSON.stringify({
                                from_id: client_id,
                                to_id: product_detail.client_id.id,
                                bid_price: bidPrice == '' ? 0 : bidPrice,
                                bid_status: 'bid_status_1',
                                article_id: product_detail.id,
                            })
                            console.log(value)
                            // return
                            setModalVisibleFeed(false)
                            fetch(`https://newapi.mediaplus.ma/api/v1/bids`, 
                                {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: value
                                })
                                .then((response) => response.json())
                                .then((json) => {
                                    console.log(json.data)
                                    fetchBids()
                                })
                                .catch((error) => {
                                    console.error(error);
                            })
                        }}>
                        <Text style={{fontFamily: 'Bold', fontSize: 16, color: "#fff"}}>إرسال</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
            </Modal>
        );
    }

    if (loading) {
        return (
            <Loadings/>
        )
    }
    else
    {
        return (
            console.log("im here: " + isLiked),
            <View style={styles.container}>
                <ModalNewBid></ModalNewBid>
                <ScrollView style={{flex:1, width: "100%", height: "auto", alignItem: 'center'}} scrollEnabled={true} overScrollMode="never">
                <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                        <Image
                            style={{ width: 24, height: 24}}
                            source={require("../assets/back.png")}
                        />
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            
                            if (isLiked == false || favoriteId == null)
                            {
                                var value = JSON.stringify({
                                    article_id : route.params.product_id,
                                    from_id : client_id ,
                                })
                                setIsLiked(true)
                                fetch(`https://newapi.mediaplus.ma/api/v1/favorites`, 
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                    },
                                    body: value
                                })
                                .then((response) => response.json())
                                .then((json) => {
                                    setFavoriteId(json.data.id)
                                })
                                .catch((error) => {
                                    setIsLiked(false)
                                    console.error(error);
                                })
                            }else{
                                setIsLiked(false)
                                fetch(`https://newapi.mediaplus.ma/api/v1/favorites/${favoriteId}`, 
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                    }
                                })
                                .then((response) => response.json())
                                .then((json) => {
                                    setFavoriteId(null)
                                })
                                .catch((error) => {
                                    console.error(error);
                                    setIsLiked(true)
                                })
                            }
                                
                            }}
                            >
                            { !isLiked ?
                                <Image
                                    style={{ width: 24, height: 24}}
                                    source={require("../assets/heart.png")}
                                />
                                :
                                <Image
                                    style={{ width: 24, height: 24}}
                                    source={require("../assets/aimer.png")}
                                />
                            }
                        </TouchableOpacity>
                </View>
                </View>

                <View style={styles.body}>
                    <View style={{ width: "90%", height: 126, alignItems: "center", justifyContent: "center", borderRadius: 22, borderWidth: 3, borderColor: '#CAC7C7'}}>
                        <Matricule
                            style={product_detail.style} // basic_00 to basic_06, public_00 to public_01, motor
                            type='detail' // detail, listing
                            alpha={product_detail.en_alpha}
                            number={product_detail.en_numbers}
                        />
                    </View>
                    <View style={{ width: 130, height: 42, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#FF7058', borderRadius: 18}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#fff'}}>خصوصي</Text>
                    </View>
                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#302D52', marginTop: 6}}>الإعلان رقم <Text style={{ fontFamily: "X_Bold", fontSize: 28, color: '#302D52', marginTop: 6}} onPress={() => copyToClipboard()}>{product_detail.id}</Text></Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('User_Profile', {user_id: product_detail.client_id.id})}>
                        <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#616161'}}>{product_detail.client_id.username}</Text>
                    </TouchableOpacity>
                    <View style={{ width: 120, height: 42, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#F3F6FF', borderRadius: 9, flexDirection: 'row', justifyContent: "space-around"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_detail.max ? product_detail.max : "لايوجد"} - {product_bids && product_bids.length > 0 ? product_bids[0].bid_price : product_detail.price} ريال</Text>
                    </View>
                    <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#616161'}}>{product_detail.city_id.city_name}</Text>
                    {product_detail.show_contact == "show" ?   (
                        <View style={{ width: "30%", height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        <TouchableOpacity style={[styles.button4, {backgroundColor: '#d7ebd5'}]} onPress={() => {
                                                                                                                let msg = "type something";
                                                                                                                let phoneWithCountryCode = product_detail.client_id.phone;
                                                                                                            
                                                                                                                let mobile =
                                                                                                                Platform.OS == "ios" ? phoneWithCountryCode : phoneWithCountryCode;
                                                                                                                if (mobile) {
                                                                                                                if (msg) {
                                                                                                                    let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                                                                                                                    Linking.openURL(url)
                                                                                                                    .then(data => {
                                                                                                                    })
                                                                                                                    .catch(() => {
                                                                                                                        alert("Make sure WhatsApp installed on your device");
                                                                                                                    });
                                                                                                                } 
                                                                                                                }
                                                                                                            }}>
                            <Image
                                style={{ width: 20, height: 20, resizeMode: 'contain'}}
                                source={require("../assets/whatsapp.png")}
                            />
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 28, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>
                        <TouchableOpacity style={[styles.button4, {backgroundColor: '#d5e3eb'}]} onPress={() => {    let phoneNumber = '';
                                                                                                                    if (Platform.OS === 'android') { phoneNumber = `tel:${product_detail.client_id.phone}`; }
                                                                                                                    else {phoneNumber = `telprompt:${product_detail.client_id.phone}`; }
                                                                                                                    Linking.openURL(phoneNumber)}} >
                            <Image
                                style={ {width: 20, height: 20, resizeMode: 'contain'}}
                                source={require("../assets/telephone-call.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    ) : (
                        <>
                        <TouchableOpacity style={{backgroundColor: '#678DF9', borderRadius: 13, paddingHorizontal: 25, paddingVertical: 5}} onPress={() => checkAndCreateRoom(route.params.user_id, client_id)}>
                            <Text style={{fontFamily: 'Bold', fontSize: 16, color: '#fff'}}>الرسائل</Text>
                        </TouchableOpacity>
                        </>
                    )} 
                    
                    <View style={{ width: "90%", height: 1, alignItems: "center", justifyContent: "center", marginTop: 5, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                    </View>

                    
                    
                </View>
                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#302D52', marginRight: '5%'}}>وصف الإعلان</Text>
                    <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#616162', marginRight: '5%', lineHeight: 25}}>{product_detail.description}</Text>
                    
                    <View style={{ width: "90%", height: 45, alignItems: "center", flexDirection: 'row', marginLeft: '5%'}}>
                        <View style={{ width: "30%", height: 1, marginTop: 10, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>
                        <View style={{ width: "40%", height: 37, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#72A2FE', borderRadius: 18}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#fff'}}>المزايدة</Text>
                        </View>
                        <View style={{ width: "30%", height: 1, marginTop: 10, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>
                    </View>
                    <View style={{ width: "90%", height: 'auto', marginLeft: '5%', justifyContent: "center"}}>
                        {
                            product_bids != null ? product_bids.map((item, index) => {

                            return <TouchableOpacity key={"bid_"+index} style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}} onPress={() => navigation.navigate("User_Profile", {user_id: item.from_id.id})}>
                                <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                                    <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>{item.from_id.username}</Text>
                                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>{item.bid_price} ريال</Text>
                                </View>
                                <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                                    <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                                </View>
                            </TouchableOpacity>
                            })
                            : <></>
                        }
                    </View>
                </ScrollView>
                    <View style={{ width: "90%", height: 50, alignItems: "center", justifyContent: "center", marginTop: '5%', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", zIndex: 1, marginBottom: '5%'}}>
                        <TouchableOpacity style={styles.button2} onPress={() => setModalVisibleFeed(true)} >
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#fff'}}>وضع مزايد</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button3} onPress={async () => {
            try {
            const result = await Share.share({
                message:
                'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            } catch (error) {
            alert(error.message);
            }
        }} >
                            <Image
                                style={{ width: 24, height: 24}}
                                source={require("../assets/share.png")}
                            />
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

    async function checkAndCreateRoom (buyerId, sellerId) {
        // check if room exists
        // const roomsCol = collection(db, 'rooms');
        // if(user_id == 1)
        //     var q = query(roomsCol, where("user2", "==", user_id));
        // else
        //     var q = query(roomsCol, where("user1", "==", user_id));
        // const querySnapshot = await getDocs(roomsCol);
        // if (querySnapshot.empty) {
        //     // create room
        //     const newRoomRef = await addDoc(collection(db, 'rooms'), {
        //         user1: buyerId,
        //         user2: sellerId,
        //         messages: [],
        //     });
        //     console.log('Room created with ID: ', newRoomRef.id);
        //     navigation.navigate('ChatScreen', {room_id: newRoomRef.id});
        // } else {
        //     // room exists
        //     console.log('Room exists');
        //     querySnapshot.forEach((doc) => {
        //         console.log(doc.id, ' => ', doc.data());
        //         navigation.navigate('ChatScreen', {room_id: doc.id});
        //     }
        //     );
        // }
        navigation.navigate('ChatScreen', {room_id: "FNpHje8wtNmGk4QWvMDG"});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        width: "90%",
        height: 60,
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center",
    },

    body: {
        width: "100%",
        marginTop: 6,
        alignItems: "center",
    },

    button: {
        width: 45,
        height: 37,
        backgroundColor: '#f1f1f1',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    button2: {
        width: '70%',
        height: 58,
        backgroundColor: '#678DF9',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    button3: {
        width: '20%',
        height: 58,
        backgroundColor: '#678DF9',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#678DF9",
        borderWidth: 2,
    },

    button4: {
        width: 40,
        height: 30,
        opacity: 0.7,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
});