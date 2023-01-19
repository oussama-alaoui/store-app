import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { I18nManager } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import CheckBox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Add_product({navigation}) {
    const [data, setData] = useState([{}]);
    const [startedPrice, setStartedPrice] = useState();
    const [endedPrice, setEndedPrice] = useState();
    const [city, setCity] = useState();
    const [category, setCategory] = useState(2);
    const [platedesigne, setPlatedesigne] = useState("");
    const [description, setDescription] = useState("");
    const [showphone, setShowphone] = useState("");
    const [pay, setPay] = useState(false);
    const [user_id, setUser_id] = useState("");

    const [engfirstletter, setEngfirstletter] = useState("");
    const [engsecondletter, setEngsecondletter] = useState("");
    const [engthirdletter, setEngthirdletter] = useState("");

    const [arfirstletter, setArfirstletter] = useState("");
    const [arsecondletter, setArsecondletter] = useState("");
    const [arthirdletter, setArthirdletter] = useState("");

    const [engfirstnumber, setEngfirstnumber] = useState("");
    const [engsecondnumber, setEngsecondnumber] = useState("");
    const [engthirdnumber, setEngthirdnumber] = useState("");
    const [engfourthnumber, setEngfourthnumber] = useState("");

    const [arfirstnumber, setArfirstnumber] = useState("");
    const [arsecondnumber, setArsecondnumber] = useState("");
    const [arthirdnumber, setArthirdnumber] = useState("");
    const [arfourthnumber, setArfourthnumber] = useState("");
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    useEffect(() => {
        const value = AsyncStorage.getItem('user_id');
        setUser_id(value);
    }, []);
    useEffect(() => {
        fetch("https://newapi.mediaplus.ma/api/v1/cities", 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then((response) => response.json())
        .then((json) => setData(json.data))
        .catch((error) => console.error(error))
        .finally(() => console.log(data));
    }, []);
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }


    return (
        console.log(platedesigne + description + category),
        <View style={styles.container}>
        <Text style={{ fontFamily: "X_Bold", fontSize: 26, marginTop: "10%", marginRight: 10, color: "#302C6B"}}>
         إضافة إعلان جديد    
        </Text>
        <View style={{backgroundColor: "#F2F2FF", width: "100%", height: "90%", alignItems: "center"}}>
            <View style={{ width: "90%", height: 40, flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                <TouchableOpacity onPress={() => setCategory(0)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 0 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center", color: "#fff"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 0 ? "#fff" : "#000"}}>دباب </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCategory(1)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 1 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center", color: "#fff"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 1 ? "#fff" : "#000"}}>نقل عام </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCategory(2)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 2 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center", color: "#fff"}}>
                    <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 2 ? "#fff" : "#000"}}>خصوصي </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", height: 1, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 20}}>
            </View>
            <ScrollView style={{ width: "100%", height: "100%", marginBottom: 10}}>
                <View style={{ width: "90%", height: 40, flexDirection: "column-reverse", justifyContent: "space-between", marginLeft: "5%"}}>
                    <Text style={{ fontFamily: "Small", fontSize: 12, color: "#000"}}>
                    المرجو إدخال الحروف و الأ رقام التي تبحت عنها
                    </Text>
                </View>

                {/* box search */}
                <View style={{ width: "90%", height: 134, flexDirection: "row", backgroundColor: "#fff", borderRadius: 26, borderWidth: 2, marginLeft: "5%"}}>

                    <View style={{ width: "87%", height: "100%", justifyContent: "center", alignItems: "center", borderRightWidth: 2, borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                        {/* top */}
                        <View style={{ width: "100%", height: "49%", flexDirection: "row",  borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                                {category != 0 ?(
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 4)}
                                    value={arfourthnumber }
                                    maxLength={1}
                                />
                                ):(
                                    <></>
                                )
                                }
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 3)}
                                    value={arthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 2)}
                                    value={arsecondnumber}
                                    maxLength={1}
                                />
                                    <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 1)}
                                    value={arfirstnumber}
                                    maxLength={1}
                                />
                            </View>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
                                {category != 0 ?(
                                <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_en(text, 3)}
                                        value={arthirdletter}
                                        maxLength={1}
                                    />
                                ):(
                                    <></>
                                    )}
                                    <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_en(text, 2)}
                                        value={arsecondletter}
                                        maxLength={1}
                                    />
                                    <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#959"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_en(text, 1)}
                                        value={arfirstletter}
                                        maxLength={1}
                                    />
                            </View>
                        </View>

                        <View style={{ width: "100%", height: 2, backgroundColor: '#000', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around"}}>
                        </View>

                        {/* bottom */}
                        <View style={{ width: "100%", height: "49%", flexDirection: "row", borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                                {category != 0 ?(
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 4)}
                                    value={engfourthnumber}
                                    maxLength={1}
                                />
                                ):(
                                    <></>
                                )
                                }
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 3)}
                                    value={engthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 2)}
                                    value={engsecondnumber}
                                    maxLength={1}
                                />
                                    <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 1)}
                                    value={engfirstnumber}
                                    maxLength={1}
                                />
                            </View>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
                                {category != 0 ?(
                            <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_ar(text, 3)}
                                        value={engthirdletter}
                                        maxLength={1}
                                    />
                                ):(
                                    <></>
                                    )}
                                    <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_ar(text, 2)}
                                        value={engsecondletter}
                                        maxLength={1}
                                    />
                                    <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#9591B0"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_ar(text, 1)}
                                        value={engfirstletter}
                                        maxLength={1}
                                    />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: "90%", borderBottomLeftRadius: 26, borderTopLeftRadius: 26, marginLeft: "5%", height: "120%"}}>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>المدينة</Text>
                    <SelectList 
                        setSelected={(val) => setCity(val)} 
                        data={data} 
                        save="key"
                    />
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>السعر</Text>
                    <View style={{ width: "100%", borderRadius: 20, flexDirection: 'row', justifyContent: "space-between",}}>
                        <View style={{ width: "50%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <TextInput
                                style={{ width: "50%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingLeft: 15, borderRadius: 8}}
                                placeholderTextColor="gray"
                                placeholder="150"
                                keyboardType="numeric"
                                onChangeText={setEndedPrice}
                                value={endedPrice}
                            />
                            <Text style={{fontFamily: "Small", fontSize: 13, color: "gray"}}>الحد (إختيار) </Text>
                        </View>

                        <View style={{ width: "50%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <TextInput
                                style={{ width: "50%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingLeft: 15, borderRadius: 8}}
                                placeholderTextColor="gray"
                                placeholder="150"
                                keyboardType="numeric"
                                maxLength={5}
                                onChangeText={setStartedPrice}
                                value={startedPrice}
                            />
                            <Text style={{fontFamily: "Small", fontSize: 13, color: "gray"}}> سعر البدأ </Text>
                        </View>
                    </View>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>الشكل</Text>
                    {category == 2 ? (    
                        <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                            
                            <TouchableOpacity
                            style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                            onPress={() => setPlatedesigne("basic-00")}
                            >
                            <Image source={require('../assets/plate_designe/plate_car_old2.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                            onPress={() => setPlatedesigne(1)}
                            >
                            <Image source={require('../assets/plate_designe/plate_car_new.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                onPress={() => setPlatedesigne("basic-06")}
                            > 
                                <Image source={require('../assets/plate_designe/plate_car_old1.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                        )}
                    {category == 1 ? (
                        <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                            <TouchableOpacity
                            style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                            onPress={() => setPlatedesigne("public-00")}
                            >
                            <Image source={require('../assets/plate_designe/public01.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                            onPress={() => setPlatedesigne("public-01")}
                            >
                            <Image source={require('../assets/plate_designe/public02.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}
                    {category == 0 ? (
                        <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                            <TouchableOpacity
                            style={{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                            onPress={() => setPlatedesigne("motor")}
                            >
                            <Image source={require('../assets/plate_designe/motor_plate.png')} style={{ width: "100%", height: 40, resizeMode: "contain"}} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}

                    {platedesigne == 1 && category == 2 ? (
                        <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>الرمز</Text>
                    ) : (
                        <></>
                    )}
                    {platedesigne == 1 && category == 2 ? (
                            <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                                <TouchableOpacity
                                    style={{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                    onPress={() => concate_for_car_plate("01")}
                                >
                                    <Image source={require('../assets/plate_designe/basic01.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                    onPress={() => concate_for_car_plate("02")}
                                >
                                    <Image source={require('../assets/plate_designe/basic02.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                    
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                    onPress={() => concate_for_car_plate("03")}
                                >
                                    <Image source={require('../assets/plate_designe/basic03.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                    onPress={() => concate_for_car_plate("04")}
                                >
                                    <Image source={require('../assets/plate_designe/basic04.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}}
                                    onPress={() => concate_for_car_plate("05")}
                                >
                                    <Image source={require('../assets/plate_designe/basic05.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                            </View>
                        
                    ) : (
                        <></>
                    )}
                    <View style={{ width: "100%", alignItems: "center", marginTop: 20}}>
                        <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000"}}>وصف الإعلان</Text>
                        <TextInput
                            style={{ width: "100%", height: 100, borderRadius: 8, alignItems: "center", flexDirection: "row", backgroundColor: "#fff", paddingHorizontal: 10, textAlign :  I18nManager.isRTL ? 'left' : 'right',}}
                            placeholder="وصف الإعلان"
                            placeholderTextColor="#000"
                            multiline={true}
                            value={description}
                            numberOfLines={4}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
                    <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{ width: "40%"}}>
                            <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000"}}>إضهار رقم الهاتف</Text>
                            <CheckBox
                                value={showphone}
                                onValueChange={() => setShowphone("show")}
                            />
                        </View>
                        <View style={{ width: "50%"}}>
                            <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000"}}>أتعهد بدفع عملات الموقع</Text>
                            <CheckBox
                                value={pay}
                                onValueChange={setPay}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={() => create_car_plate()}
                            disabled={pay == false ? true : false}
                        >
                            <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}>إضافة إعلان</Text>
                    </TouchableOpacity> 
                </View>
            </ScrollView>
        </View>
    </View>
    )

    function to_ar(c, j)
    {
        console.log("kkkkk");
        var ar = 'أبحدرسصطعقكلمنهوى'.split('');
        var en = "ABJDRSXTEGKLZNHUV";
        if(c != "")
        {
            for(var i = 0; i < 17; i++)
            {
                if (en[i] == c)
                {
                    console.log(ar[i]);
                    if(j == 1 && c != "")
                    {
                        setEngfirstletter(en[i]);
                        setArfirstletter(ar[i]);
                        console.log("-------1");
                    }
                    else if(j == 2)
                    {
                        setEngsecondletter(en[i]);
                        setArsecondletter(ar[i]);
                        console.log("2");
                    }
                    else if(j == 3)
                    {
                        setEngthirdletter(en[i]);
                        setArthirdletter(ar[i]);
                        console.log("3");
                    }
                }
            }
        }
        else
        {
            if(j == 1)
            {
                setEngfirstletter("");
                setArfirstletter("");
            }
            else if(j == 2)
            {
                setEngsecondletter("");
                setArsecondletter("");
            }
            else if(j == 3)
            {
                setEngthirdletter("");
                setArthirdletter("");
            }
        }
    }

    function to_ar_num(c, j)
    {
        console.log("kkkkkg");
        var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
        var en = '0123456789'.split('');
        if(c != "")
        {
            for(var i = 0; i < 17; i++)
            {
                if (en[i] == c)
                {
                    console.log(ar[i]);
                    if(j == 1 && c != "")
                    {
                        setEngfirstnumber(en[i]);
                        setArfirstnumber(ar[i]);
                        console.log("-------1");
                    }
                    else if(j == 2)
                    {
                        setEngsecondnumber(en[i]);
                        setArsecondnumber(ar[i]);
                        console.log("2");
                    }
                    else if(j == 3)
                    {
                        setEngthirdnumber(en[i]);
                        setArthirdnumber(ar[i]);
                        console.log("3");
                    }
                    else if(j == 4)
                    {
                        setEngfourthnumber(en[i]);
                        setArfourthnumber(ar[i]);
                        console.log("4");
                    }
                }
            }
        }
        else
        {
            if(j == 1)
            {
                setEngfirstnumber("");
                setArfirstnumber("");
            }
            else if(j == 2)
            {
                setEngsecondnumber("");
                setArsecondnumber("");
            }
            else if(j == 3)
            {
                setEngthirdnumber("");
                setArthirdnumber("");
            }
            else if(j == 4)
            {
                setEngfourthnumber("");
                setArfourthnumber("");
            }
        }
    }
    
    function to_en(c, j)
    {
        console.log("kkkkk");
        var ar = 'أبحدرسصطعقكلمنهوى'.split('');
        var en = "ABJDRSXTEGKLZNHUV";
        if(c != "")
        {
            for(var i = 0; i < 17; i++)
            {
                if (ar[i] == c)
                {
                    console.log(en[i]);
                    if(j == 1)
                    {
                        setEngfirstletter(en[i]);
                        setArfirstletter(ar[i]);
                    }
                    else if(j == 2)
                    {
                        setEngsecondletter(en[i]);
                        setArsecondletter(ar[i]);
                    }
                    else if(j == 3)
                    {
                        setEngthirdletter(en[i]);
                        setArthirdletter(ar[i]);
                    }
                }
                
            }
        }else{
            if(j == 1)
            {
                setEngfirstletter("");
                setArfirstletter("");
            }
            else if(j == 2)
            {
                setEngsecondletter("");
                setArsecondletter("");
            }
            else if(j == 3)
            {
                setEngthirdletter("");
                setArthirdletter("");
            }
        }
    }

    function to_en_num(c, j)
    {
        console.log("kkkkdddk");
        var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
        var en = '0123456789'.split('');
        if(c != "")
        {
            for(var i = 0; i < 17; i++)
            {
                if (ar[i] == c)
                {
                    console.log(en[i]);
                    if(j == 1)
                    {
                        setEngfirstnumber(en[i]);
                        setArfirstnumber(ar[i]);
                    }
                    else if(j == 2)
                    {
                        setEngsecondnumber(en[i]);
                        setArsecondnumber(ar[i]);
                    }
                    else if(j == 3)
                    {
                        setEngthirdnumber(en[i]);
                        setArthirdnumber(ar[i]);
                    }
                    else if(j == 4)
                    {
                        setEngfourthnumber(en[i]);
                        setArfourthnumber(ar[i]);
                    }
                }
                
            }
        }else{
            if(j == 1)
            {
                setEngfirstnumber("");
                setArfirstnumber("");
            }
            else if(j == 2)
            {
                setEngsecondnumber("");
                setArsecondnumber("");
            }
            else if(j == 3)
            {
                setEngthirdnumber("");
                setArthirdnumber("");
            }
            else if(j == 4)
            {
                setEngfourthnumber("");
                setArfourthnumber("");
            }
        }
    }

    function concate_for_car_plate(str)
    {
        var res = "basic-"+str;
        setPlatedesigne(res);
    }

    async function create_car_plate()
    {
        var str = engthirdletter+engsecondletter+engfirstletter;
        setEngfirstletter("");
        setEngsecondletter("");
        setEngthirdletter("");
         console.log(`here is : ${category}`);
         var number = engfourthnumber+engthirdnumber+engsecondnumber+engfirstnumber;
        setEngfirstnumber("");
        setEngsecondnumber("");
        setEngthirdnumber("");
        setEngfourthnumber("");
        console.log("ousssssssssssssssss");
        var value = JSON.stringify({
            price: startedPrice,
            max: endedPrice,
            type: category.toString(),
            description: description,
            city_id: city,
            client_id: 1,
            en_numbers: number,
            en_alpha: str,
            show_contact: showphone,
            style: platedesigne,
        })
        console.log(str);
        console.log(number);
        console.log(value);
        fetch('https://newapi.mediaplus.ma/api/v1/articles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: value
        }).then((response) => 
            response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status == true)
                {
                    Alert.alert(
                        "تم إضافة الإعلان بنجاح",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    navigation.navigate('Home');
                }
            }
        ).catch((error) => {
            console.error(error);
        }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        
    },
    button: {
        width: '100%',
        height: 55,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    },
    selection_box:{
        borderWidth: 1,
        borderColor: '#678DF9',
        borderRadius: 8,
    }
});
