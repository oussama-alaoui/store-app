import React, { useEffect } from "react";
import { ImageBackground, Linking, SafeAreaView, Share } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView, Clipboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Matricule from './svg_assets/matricule'

const { width, height } = Dimensions.get('window');


export default function Product_detail({ navigation, route })
{
    // const onShare = ;
    const [product_detail, setProduct_detail] = useState({})
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
                 console.log(json.data)
             })
             .catch((error) => {
                 console.error(error);
         })
         
     }, [])
     if (!fontsLoaded) {
         return <Text>Loading...</Text>;
     }
     const copyToClipboard = () => {
         Clipboard.setString('012548');
    }



    return (
        console.log(route.params.product_id),
        <View style={styles.container}>
            <ScrollView style={{flex:1, width: "100%", height: "auto", alignItem: 'center'}} scrollEnabled={true}>
            <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
                        <Image
                            style={{ width: 24, height: 24}}
                            source={require("../assets/heart.png")}
                        />
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
                <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#616161'}}> {product_detail.client_id.username}</Text>
                <View style={{ width: 170, height: 42, alignItems: "center", justifyContent: "center", marginTop: 6, backgroundColor: '#F3F6FF', borderRadius: 9, flexDirection: 'row', justifyContent: "space-around"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_detail.max} ريال</Text>
                    <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>|</Text>
                    <Text style={{ fontFamily: "Bold", fontSize: 16, color: '#7479BF'}}>{product_detail.price} ريال</Text>
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
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>70 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>80 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                    <View style={{ width: "60%", height: 90, marginTop: 10, borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginLeft: '40%'}}>
                        <View style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 100}}>
                            <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000'}}>المستخدم 1</Text>
                            <Text style={{ fontFamily: "Bold", fontSize: 20, color: '#7479BF'}}>85 ريال</Text>
                        </View>
                        <View style={{ width: 80, height: 80, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
                <View style={{ width: "90%", height: 50, alignItems: "center", justifyContent: "center", marginTop: '5%', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", zIndex: 1, marginBottom: '5%'}}>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate()} >
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