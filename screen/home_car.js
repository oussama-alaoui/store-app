import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

 export default function Home_cars () {

    const [Number, setNumber] = useState();
    const [category, setCategory] = useState(1);
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/Almarai-Light.ttf"),
        Bold: require("../assets/fonts/Almarai-Bold.ttf"),
        X_Bold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
     });
     if (!fontsLoaded) {
         return <Text>Loading...</Text>;
     }

    return(
        console.log(category),
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.top}>
                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]}
                        onPress={() => setCategory(3)}
                        disable={false}
                    >
                        <Image source={require('../assets/moto.png')} style={{width: '80%', top: '16%'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]} 
                        onPress={() => setCategory(2)}    
                    >
                        <Image source={require('../assets/camion.png')} style={{width: '80%'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.box_category, styles.shadow_category]}
                        onPress={() => setCategory(1)}
                    >
                        <Image source={require('../assets/car.png')} style={{width: '80%'}}/>
                    </TouchableOpacity>
                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={{width: '23%', height: 37, backgroundColor: '#ECEFFF', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginRight:53, marginLeft: 13, flexDirection: 'row', justifyContent: 'space-around', borderColor: '#C7C9F9', borderWidth: 2}}>
                         <Text style={{fontSize: 10, fontFamily: 'Bold', letterSpacing: 2, color: '#616DE3'}}>إضافة إعلان</Text>
                         <Image source={require('../assets/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '11%', height: 37, backgroundColor: '#F9F9FE', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight:15 }}>
                        <Image source={require('../assets/filter.png')}/>
                    </TouchableOpacity>
                    <View style={{width: '40%', height: 37, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                                <TextInput
                                    style={[styles.input, {top: 0, width: '75%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#F3F4F9', writingDirection: "ltr", padding: 10, fontSize: 12, fontFamily: 'Small'}]}
                                    onChangeText={setNumber}
                                    value={category}
                                    letterSpacing={2}
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
            
            <View style={styles.body}>
                <View style={{width: '90%', height: '24%', backgroundColor: '#fff', borderRadius: 10, top: 10, justifyContent: 'space-around', flexDirection: 'row'}}>

                    <View style={{width: '100%', height: '60%', alignItems: 'center', flexDirection: 'row', left: 110}}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={{fontSize: 11, fontFamily: 'Bold', letterSpacing: 2, color: '#00084F', paddingTop: 15}}>أسامة العلوي</Text>
                                <Text style={{fontSize: 7, fontFamily: 'Small', color: 'gray', paddingTop: 5, left: 30}}>@oussama</Text>
                            </View>
                            <Image source={require('../assets/user_1.png')} style={{width: 40, height: 40, resizeMode: 'contain', top: 5}}/>
                        </View>
                        <Text style={{fontSize: 11, fontFamily: 'Bold', letterSpacing: 2, color: '#00084F', paddingTop: 15}}>أسامة </Text>
                        <Text style={{fontSize: 7, fontFamily: 'Small', color: 'gray', paddingTop: 5, left: 30}}>@oussama</Text>
                    </View>
                    <View style={{width: '40%', height: '40%',borderColor: '#c2c0c0', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', top: '15%', left: -40}}>
                        <Image source={require('../assets/plate_car1.png')} style={{width: 110, height: 30, resizeMode: 'contain'}}/>
                    </View>
                </View>
            </View>
        </View>
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
        top: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },

    top: {
        width: '100%',
        height: 80,
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
        height: '90%',
        backgroundColor: '#F9F9FF',
        alignItems: 'center',
    },

    box_category: {
        width: '26%', 
        height: 80, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 7
    },

    shadow_category: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});
