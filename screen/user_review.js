import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import  Rating from 'react-native-easy-rating';
import { ScrollView } from "react-native";

export default function UserReview({navigation, route}) {
    const [isLogin, setIsLogin] = React.useState(true);
    const [reviews, setReviews] = React.useState([])
    useEffect(() => {
        fetch(`https://newapi.mediaplus.ma/api/v1/reviews/to_id/${route.params.user_id}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setReviews(json)
                setIsLogin(false)
                console.log(json)
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
        return <Text>Loading...</Text>;
    }
    if (isLogin) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Loading...</Text>
            </View>
        );
    }
    else{
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
                <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 20, marginTop: 20}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require("../assets/back.png")} style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 20, fontFamily: "Bold"}}>ملاحظات حول المستخدم</Text>
                <View style={{height: 1, width: "100%", backgroundColor: "gray", marginTop: 30, opacity: 0.3}}></View>
                <View style={{justifyContent: "center", width: "100%", marginTop: 20, alignItems: "center"}}>
                <ScrollView style={{width: "100%", height: "100%"}} overScrollMode="never">
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>
                {reviews.data.map((review, index) => {
                    return (
                        <View key={index} style={{flexDirection: "row", width: "90%", marginBottom: 30}}>
                            <View style={{ width: "80%", justifyContent: "center", borderRadius: 100, }}>
                                <Text style={{ fontFamily: "Bold", fontSize: 17, color: '#000', marginRight: "4%"}}>{review.from_id.username}</Text>
                                <Rating
                                    style={{width: 100, height: 30, alignItems: 'center', flexDirection: 'row',justifyContent: 'space-around', marginLeft: "58%"}}
                                    rating={review.rating}
                                    max={5}
                                    iconWidth={24}
                                    iconHeight={24}
                                />
                                <Text   style={{borderRadius: 10, elevation: 2, shadowColor: 'black', paddingRight: 15, textAlign: 'right', writingDirection: 'rtl',padding: 14, lineHeight: 25, color: '#8D8D8D', fontFamily: 'Bold', fontSize: 13}} >{review.details}</Text>
                            </View>
                            <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                                <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                            </View>
                        </View>
                    )
                }
                )}
                </View>
                 </ScrollView>   
                </View>
            </SafeAreaView>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});
