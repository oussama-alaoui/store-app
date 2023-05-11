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
import { GetData, RemoveData, StoreData } from "../screen/Syncstorage";
import Loadings from "./complement/loadings";
import { Modal } from "react-native";

export default function Edit_product({navigation, route}) {
    const [data, setData] = useState([{}]);
    const [startedPrice, setStartedPrice] = useState(route.params.product.price);
    const [endedPrice, setEndedPrice] = useState(route.params.product.max ? route.params.product.max : 0);
    const [city, setCity] = useState(route.params.product.city_id.id);
    const [category, setCategory] = useState(route.params.product.type);
    const [platedesigne, setPlatedesigne] = useState(route.params.product.style);
    const [description, setDescription] = useState(route.params.product.description);
    const [showphone, setShowphone] = useState(route.params.product.show_contact == "show" ? true : false);
    const [client_id, setClient_id] = useState();
    const [showType, setShowType] = useState(false);
    const [modalVisibleFeed, setModalVisibleFeed] = useState(false)

    const [engfirstletter, setEngfirstletter] = useState();
    const [engsecondletter, setEngsecondletter] = useState();
    const [engthirdletter, setEngthirdletter] = useState();

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
    const [error, setError] = useState('')
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
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

    useEffect(() => {
        init_plate_alpha_number(route.params.product.en_alpha, route.params.product.en_numbers);
        GetData("user_id").then((data) => {
            setClient_id(data);
        });
    }, []);

    function init_plate_alpha_number (str, number)
    {
        if (str[0])
            setEngfirstletter(str[2].toUpperCase());
        if (str[1])
            setEngsecondletter(str[1].toUpperCase());
        if (str[2])
            setEngthirdletter(str[0].toUpperCase());
        if (number[0])
            setEngfirstnumber(number[3]);
        if (number[1])
            setEngsecondnumber(number[2]);
        if (number[2])
            setEngthirdnumber(number[1]);
        if (number[3])
            setEngfourthnumber(number[0]);
        // convert to arabic
        if (str[0])
            to_ar(str[0], 3);
        if (str[1])
            to_ar(str[1], 2);
        if (str[2])
            to_ar(str[2], 1);
        if (number[0])
            to_ar_num(number[0], 4);
        if (number[1])
            to_ar_num(number[1], 3);
        if (number[2])
            to_ar_num(number[2], 2);
        if (number[3])
            to_ar_num(number[3], 1);
    }
    if (!fontsLoaded) {
        return <Loadings/>;
    }

    function trans_num(num, str){
        // check if the number is arabic or english
        if (num >= 0 && num <= 9){
            to_ar_num(num, str);
        }else{
            to_en_num(num, str);
        }
    }

        const ModalPromise = () => {
        const   [Pay, setPay] = useState(false);
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleFeed}
                onRequestClose={() => {
                    setModalVisibleFeed(!modalVisibleFeed);
                }} style={{height: "100%", width: "100%", position: "absolute"}}>
                <View style={{height: "100%", width: "100%", backgroundColor: "rgba(177, 156, 217, 0.2)", justifyContent:"center"}}>
                <View style={{marginHorizontal: 20, backgroundColor: "#fff", borderRadius: 20}}>
                    <View style={{ width: "78%", marginVertical: 40, flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginHorizontal: 10}}>أتعهد بالدفع للموقع</Text>
                            <CheckBox
                                value={Pay}
                                onValueChange={() => setPay(!Pay)}
                            />
                    </View>
                    <TouchableOpacity style={{marginHorizontal: 30, paddingVertical: 15, borderRadius: 10, marginBottom: 30, backgroundColor: '#678DF9', justifyContent: 'center', alignItems: 'center', opacity: Pay == false ? .5 : 1}}
                        disabled={Pay == false ? true : false}
                        onPress={() => check_all()}>
                        <Text style={{fontFamily: 'Small', fontSize: 16, color: "#fff"}}>إرسال</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: "absolute", top: 15, right: 15}} onPress={() => setModalVisibleFeed(false)}>
                        <Text style={{fontFamily: 'Bold', fontSize: 20, color: "red"}}>X</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
            </Modal>
        );
    }

    return (
        <View style={styles.container}>
            <ModalPromise/>
        <Text style={{ fontFamily: "X_Bold", fontSize: 26, marginTop: "10%", marginRight: 10, color: "#302C6B"}}>
         تعديل إعلان     
        </Text>
        {
            error == '' ? <></> :
            <View style={{alignItems:'center', marginVertical: 15}}>
                <Text style={{borderRadius: 20, fontWeight: 'bold', fontSize:14, paddingHorizontal: 20,paddingTop: 7, paddingBottom: 5, color:'black', backgroundColor:'rgba(255, 75, 0, .35)'}}>{error}</Text>
            </View>
        }
        <View style={{backgroundColor: "#F1FBFF", width: "100%", height: "90%", alignItems: "center"}}>
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
            <ScrollView style={{ width: "100%", height: "100%", marginBottom: error ? 60 : 10}} overScrollMode="never">
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
                                    onChangeText={(text) => trans_num(text, 4)}
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
                                    onChangeText={(text) => trans_num(text, 3)}
                                    value={arthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => trans_num(text, 2)}
                                    value={arsecondnumber}
                                    maxLength={1}
                                />
                                    <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => trans_num(text, 1)}
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
                                    onChangeText={(text) => trans_num(text, 4)}
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
                                    onChangeText={(text) => trans_num(text, 3)}
                                    value={engthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => trans_num(text, 2)}
                                    value={engsecondnumber}
                                    maxLength={1}
                                />
                                    <TextInput
                                    style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => trans_num(text, 1)}
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
                            keyboardType="numeric"
                            value={endedPrice == 0 ? "" : endedPrice.toString()}
                            onChangeText={text => setEndedPrice(parseInt(text))}
                        />
                            <Text style={{fontFamily: "Small", fontSize: 13, color: "gray"}}>الحد (إختيار) </Text>
                        </View>

                        <View style={{ width: "50%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <TextInput
                                style={{ width: "50%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingLeft: 15, borderRadius: 8}}
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                maxLength={5}
                                value={startedPrice.toString()}
                                onChangeText={text => setStartedPrice(parseInt(text))}
                            />
                            <Text style={{fontFamily: "Small", fontSize: 13, color: "gray"}}> سعر البدأ </Text>
                        </View>
                    </View>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>الشكل</Text>
                    {category == 2 ? (    
                        <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                            
                            <TouchableOpacity
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-00" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                            onPress={() => {setPlatedesigne('basic-00')
                                setShowType(false)}}
                                >
                            <Image source={require('../assets/plate_designe/plate_car_old2.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-01" || platedesigne == "basic-02" || platedesigne == "basic-03" || platedesigne == "basic-04" || platedesigne == "basic-05" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                            onPress={() => {setPlatedesigne(1)
                            setShowType(true)}}
                            >
                            <Image source={require('../assets/plate_designe/plate_car_new.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>


                            <TouchableOpacity
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-06" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                            onPress={() => {setPlatedesigne('basic-06')
                                setShowType(false)}}
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
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "public-00" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                            onPress={() => setPlatedesigne("public-00")}
                            >
                            <Image source={require('../assets/plate_designe/public01.png')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "public-01" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
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
                            style={[{ width: "30%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "motor" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                            onPress={() => setPlatedesigne("motor")}
                            >
                            <Image source={require('../assets/plate_designe/motor_plate.png')} style={{ width: "100%", height: 40, resizeMode: "contain"}} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}

                    {showType && category == 2 ? (
                        <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>الرمز</Text>
                    ) : (
                        <></>
                    )}
                    {showType == true && category == 2 ? (
                            <View style={{ width: "100%", borderRadius: 8, justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: 10}}>
                                <TouchableOpacity
                                    style={[{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-01" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                                    onPress={() => concate_for_car_plate("01")}
                                >
                                    <Image source={require('../assets/plate_designe/basic01.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-02" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                                    onPress={() => concate_for_car_plate("02")}
                                >
                                    <Image source={require('../assets/plate_designe/basic02.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                    
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-03" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                                    onPress={() => concate_for_car_plate("03")}
                                >
                                    <Image source={require('../assets/plate_designe/basic03.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-04" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
                                    onPress={() => concate_for_car_plate("04")}
                                >
                                    <Image source={require('../assets/plate_designe/basic04.jpeg')} style={{ width: "90%", height: 20, resizeMode: "contain"}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{ width: "15%", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#fff"}, platedesigne == "basic-05" ? { borderColor: "#4287f5", borderWidth: 2} : { borderColor: "#fff", borderWidth: 2}]}
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
                    <View style={{ width: "90%", marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginHorizontal: 10}}>إضهار رقم الهاتف</Text>
                            <CheckBox
                                value={showphone}
                                onValueChange={() => setShowphone(!showphone)}
                            />
                    </View>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={() => check_all()}
                        >
                            <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}>تعديل إعلان</Text>
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
        if (c == "ا" || c == "آ" || c == "إ"){c = "أ";}
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
        if (c == "ا" || c == "آ" || c == "إ"){c = "أ";}
        if (c == "ئ" || c == "ؤ" || c == "ي"){c = "ى";}
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

    function check_all()
    {
        // check if paltedesigne is in category
        if ((category == 0 && platedesigne != "motor") || 
        (category == 1 && (platedesigne != "public-00" && platedesigne != "public-01")) || 
        (category == 2 && (platedesigne != "basic-00" && platedesigne != "basic-01" && platedesigne != "basic-02" && platedesigne != "basic-03" && platedesigne != "basic-04" && platedesigne != "basic-05" && platedesigne != "basic-06")))
        {
            setError("يجب إختيار شكل اللوحة مطابق لنوع السيارة");
            console.log("category is : " + category + " and platedesigne is : " + platedesigne);
        }
        else {
            // check if all numbers are 0
            if (engfirstnumber == 0 && engsecondnumber == 0 && engthirdnumber == 0 && engfourthnumber == 0)
            {
                setError("يجب إختيار رقم للوحة");
            }
            // CHECK IF MOTOR WE NEED TWO LETTERS IF NOT WE NEED THREE LETTERS
            else if (category == 0 && (engfirstletter == "" || engsecondletter == "") || category == 1 && (engfirstletter == "" || engsecondletter == "" || engthirdletter == "") || category == 2 && (engfirstletter == "" || engsecondletter == "" || engthirdletter == ""))
            {
                setError("يجب إختيار حرف للوحة");
            }
            else {
                setError("");
                create_car_plate();
            }
        }
    }

    async function create_car_plate()
    {
        if (category == 0)
        {
            var str = engfirstletter+engsecondletter;
            var number = engthirdnumber+engsecondnumber+engfirstnumber;
        }
        else
        {
            var str = engthirdletter+engsecondletter+engfirstletter;
            var number = engfourthnumber+engthirdnumber+engsecondnumber+engfirstnumber;
        }
        var value = JSON.stringify({
            price: startedPrice,
            max: endedPrice,
            type: category.toString(),
            description: description,
            city_id: city,
            client_id: client_id,
            en_numbers: number,
            en_alpha: str,
            show_contact: showphone == true ? "show" : "hide",
            style: platedesigne,
        })
        console.log(value);
        fetch(`https://newapi.mediaplus.ma/api/v1/articles/${route.params.product.id}?_method=PUT`, {
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
