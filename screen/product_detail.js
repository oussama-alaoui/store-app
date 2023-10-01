import React, { useEffect } from "react";
import { Linking, Share } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Matricule from './svg_assets/matricule'
import { Modal } from "react-native";
import { TextInput } from "react-native";
import { GetData } from "./Syncstorage";
import Loadings from "./complement/loadings";
import Clipboard from '@react-native-clipboard/clipboard';
import { Ionicons } from '@expo/vector-icons';
import { db, collection, getDocs, query, addDoc, where } from "../firebase";


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
    // translate number to arabic
    const ar_number = (c) => {
        var c_split = c.split('');
        var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
        var en = '0123456789'.split('');
        var result = "";
        console.log("c_split: ", c_split);
        for(var i = 0; i < c_split.length; i++){
            for(var j = 0; j < 10; j++)
                if (en[j] == c_split[i])
                    result += ar[j];
        }
        return result;
    }

    // translate letter to arabic
    const ar_letter = (c) => {
        var c_split = c.split('');
        var ar = 'أبحدرسصطعقكلمنهوى'.split('');
        var en = "ABJDRSXTEGKLZNHUV".split('');
        var result = "";
        console.log("c_split: ", c_split);
        for(var i = 0; i < c_split.length; i++){
            for(var j = 0; j < 17; j++)
                if (en[j] == c_split[i])
                    result += ar[j];
        }
        // rotate the letter
        result = result.split('').reverse().join(' ');
        return result;
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
                        style={{height: 60, marginHorizontal: 30, borderRadius: 10, marginVertical: 20, elevation: 1, shadowColor: '#aab8e6', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',}}
                        onChangeText={text => setBidPrice(text)}
                        keyboardType="numeric"
                        defaultValue={bidPrice}
                        placeholder="قيمة المزايدة"
                        multiline={false}
                    />
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", marginBottom: 1}}>
                    <TouchableOpacity style={{paddingVertical: 15, borderRadius: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', width: "40%"}} onPress={() => setModalVisibleFeed(false)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 20, color: "red"}}>إغلاق</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15, borderRadius: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', width: "40%"}}
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
                        <Text style={{fontFamily: 'Bold', fontSize: 16, color: "#000"}}>إرسال</Text>
                    </TouchableOpacity>
                    </View>
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
            var ar_num = ar_number(product_detail.en_numbers)
            var ar_alpha = ar_letter(product_detail.en_alpha)
            const message = `أعجبني هذا الإعلان رقم ${product_detail.id} في تطبيق لوحتي⁩ للوحة \n\n[ ${product_detail.en_alpha} ${product_detail.en_numbers}]\n[${ar_alpha} ${ar_num}]\n\nيمكنك البحث عن اللوحة عن طريق رقم الاعلان باستخدام التطبيق.\nلتحميل التطبيق\nLohty.com \n\nاول منصة لعرض جميع انواع اللوح بالسعودية 🇸🇦`;
        return (
            <View style={styles.container}>
                <ModalNewBid></ModalNewBid>
                <ScrollView style={{flex:1, width: "100%", height: "auto", alignItem: 'center'}} scrollEnabled={true} overScrollMode="never">
                <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack(null)} >
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
                        
                        <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#fff'}}>{product_detail.type == 2 ? "خصوصي" : product_detail.type == 1 ? "عام" : "دباب"}</Text>
                    </View>
                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#302D52', marginTop: 6}}>الإعلان رقم <Text style={{ fontFamily: "X_Bold", fontSize: 28, color: '#302D52', marginTop: 6}} onPress={() => copyToClipboard()}>{product_detail.id}</Text></Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('User_Profile', {user_id: product_detail.client_id.id})}>
                        <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#616161'}}>{product_detail.client_id.username}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 6, backgroundColor: '#F3F6FF', borderRadius: 8}}>
                        { product_detail.max ?
                        <View style={{marginHorizontal: 10, alignItems: "center", justifyContent: "center", marginTop: 6, borderRadius: 9, flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_detail.max ? product_detail.max : "لايوجد"} ريال</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>الحد : </Text>
                        </View>
                        :
                        <></>
                        }
                        <View style={{marginHorizontal: 10, alignItems: "center", justifyContent: "center", marginTop: 6, borderRadius: 9, flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_bids && product_bids.length > 0 ? product_bids[0].bid_price : product_detail.price} ريال</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>السوم : </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#616161'}}>{product_detail.city_id.city_name}</Text>
                    {product_detail.show_contact == "show" ?   (
                        <View style={{ width: "40%", height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
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
                            <Ionicons name="logo-whatsapp" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 28, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>
                        <TouchableOpacity style={[styles.button4, {backgroundColor: '#d5e3eb'}]} onPress={() => {    let phoneNumber = '';
                                                                                                                    if (Platform.OS === 'android') { phoneNumber = `tel:${product_detail.client_id.phone}`; }
                                                                                                                    else {phoneNumber = `telprompt:${product_detail.client_id.phone}`; }
                                                                                                                    Linking.openURL(phoneNumber)}} >
                            <Ionicons name="ios-call" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 28, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>
                        <TouchableOpacity style={[styles.button4, {backgroundColor: '#d7ebd5'}]}  onPress={() => checkAndCreateRoom(product_detail.client_id.id, client_id)}>
                            <Ionicons name="chatbox-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    ) : (
                        <>
                        <TouchableOpacity style={[styles.button4, {backgroundColor: '#d7ebd5'}]}  onPress={() => checkAndCreateRoom(product_detail.client_id.id, client_id)}>
                            <Ionicons name="chatbox-outline" size={24} color="black" />
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

                            return <TouchableOpacity key={"bid_"+index} style={{width: "90%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center"}} onPress={() => navigation.navigate(item.from_id.id != client_id ? "User_Profile" : "Profile", {user_id: item.from_id.id})}>
                                <View style={{height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100, marginRight: 20, width: "80%"}}>
                                    <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>{item.from_id.username}</Text>
                                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>{item.bid_price} ريال</Text>
                                </View>
                                <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                                    <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={{uri: item.from_id.photo ? `https://newapi.mediaplus.ma/storage/${item.from_id.photo}` : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}}/>
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
                message: message,
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
        const roomsCol = collection(db, 'rooms');
        const querySnapshot = await getDocs(query(roomsCol, 
          where('user1', '==', buyerId), 
          where('user2', '==', sellerId)
        ));
        if (!querySnapshot.empty) {
          // room exists
          const doc = querySnapshot.docs[0];
          console.log('Room exists');
          navigation.navigate('ChatScreen', {room_id: doc.id, otherUser: product_detail.client_id});
        } else {
          const querySnapshot2 = await getDocs(query(roomsCol, 
            where('user1', '==', sellerId), 
            where('user2', '==', buyerId)
          ));
          if (!querySnapshot2.empty) {
            // room exists
            const doc = querySnapshot2.docs[0];
            console.log('Room exists');
            navigation.navigate('ChatScreen', {room_id: doc.id, otherUser: product_detail.client_id});
          } else {
            // create room
            const newRoomRef = await addDoc(collection(db, 'rooms'), {
              user1: buyerId,
              user2: sellerId,
              messages: [],
            });
            console.log('Room created with ID: ', newRoomRef.id);
            navigation.navigate('ChatScreen', {room_id: newRoomRef.id, otherUser: product_detail.client_id});
          }
        }
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