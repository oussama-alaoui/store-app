import React, { useEffect } from "react";
import { Alert, ImageBackground, Linking, SafeAreaView, Share } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Matricule from './svg_assets/matricule'
import Loadings from "./complement/loadings";
import Clipboard from '@react-native-clipboard/clipboard';

const { width, height } = Dimensions.get('window');


export default function Product_detail_my({ navigation, route })
{
    // const onShare = ;
    const [product_detail, setProduct_detail] = useState({})
    const [product_bids, setProductBids] = useState(null)
    const [loading, setLoading] = useState(true)
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
     });
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
                // console.log(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
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
                console.log(json.data)
            })
            .catch((error) => {
                console.error(error);
        })
         
     }, [route.params.product_id])
     if (!fontsLoaded) {
         return <Loadings/>
     }
    const copyToClipboard = async () => {
        Clipboard.setString("hello word");
        alert('تم نسخ الرقم');
    };


    if (loading) {
        return (
            <Loadings/>
        )
    }
    else
    {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1, width: "100%", height: "auto", alignItem: 'center'}} scrollEnabled={true} overScrollMode="never">
                <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack(null)} >
                        <Image
                            style={{ width: 24, height: 24}}
                            source={require("../assets/back.png")}
                        />
                    </TouchableOpacity>
                    <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#FF7058"}]} onPress={() => delete_products()} >
                            <Image
                                style={{ width: 24, height: 24}}
                                source={require("../assets/corbeille.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#678DF9"}]} onPress={() => {
                            fetch(`https://newapi.mediaplus.ma/api/v1/articles/rank/${route.params.product_id}`, 
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                }
                                })
                                .then((response) => response.json())
                                .then((json) => {
                                    alert('تم إعادت الإدراج')
                                    console.log(json)
                                })
                                .catch((error) => {
                                    console.error(error);
                            })
                        }} >
                            <Image
                                style={{ width: 24, height: 24}}
                                source={require("../assets/up.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#678DF9"}]} onPress={() => {navigation.navigate("Edit_product", {product: product_detail, city: "2", category: "2"})}} >
                            <Image
                                style={{ width: 24, height: 24}}
                                source={require("../assets/modifier.png")}
                            />
                        </TouchableOpacity>
                    </View>
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
                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#302D52', marginTop: 6}}>الإعلان رقم <Text style={{ fontFamily: "X_Bold", fontSize: 28, color: '#302D52', marginTop: 6}} onPress={copyToClipboard}>{product_detail.id}</Text></Text>
                    
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 6, backgroundColor: '#F3F6FF'}}>
                        { product_detail.max ?
                        <View style={{height: 42, alignItems: "center", justifyContent: "center", marginTop: 6, borderRadius: 9, flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_detail.max ? product_detail.max : "لايوجد"} ريال</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>الحد : </Text>
                        </View>
                        :
                        <></>
                        }
                        <View style={{height: 42, alignItems: "center", justifyContent: "center", marginTop: 6, borderRadius: 9, flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_bids && product_bids.length > 0 ? product_bids[0].bid_price : product_detail.price} ريال</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>السوم : </Text>
                        </View>
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
                                                                                                                        console.log("WhatsApp Opened");
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

                            return <View key={"bid_"+index} style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                                <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                                    <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>{item.from_id.username}</Text>
                                    <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>{item.bid_price} ريال</Text>
                                </View>
                                <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                                    <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                                </View>
                            </View>
                            })
                            : <></>
                        }
                        
                    </View>
                </ScrollView>
                    <View style={{ width: "90%", height: 50, alignItems: "center", justifyContent: "center", marginTop: '5%', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", zIndex: 1, marginBottom: '5%'}}>
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

    async function delete_products (){
        try {
            const response = await fetch(`https://newapi.mediaplus.ma/api/v1/articles/${route.params.product_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
            if(json.StatusCode == 200){
                console.log("deleted");
                alert(
                    "تم الحذف بنجاح",
                    "تم حذف المنتج بنجاح",
                    [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ]
                );
                navigation.navigate('Profile');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
};

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
        marginLeft: 5,
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