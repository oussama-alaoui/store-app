import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { I18nManager } from 'react-native';

export default function Search({navigation}) {
    const [category, setCategory] = useState(1);

    const [engfirstletter, setEngfirstletter] = useState("");
    const [engsecondletter, setEngsecondletter] = useState("");
    const [engthirdletter, setEngthirdletter] = useState("");

    const [arfirstletter, setArfirstletter] = useState("");
    const [arsecondletter, setArsecondletter] = useState("");
    const [arthirdletter, setArthirdletter] = useState("");

    const [engfirstnumber, setEngfirstnumber] = useState("");
    const [engsecondnumber, setEngsecondnumber] = useState("");
    const [engthirdnumber, setEngthirdnumber] = useState("");

    const [arfirstnumber, setArfirstnumber] = useState("");
    const [arsecondnumber, setArsecondnumber] = useState("");
    const [arthirdnumber, setArthirdnumber] = useState("");


    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: "X_Bold", fontSize: 26, marginTop: "10%", marginRight: 10, color: "#302C6B"}}>
                البحث على إعلان
            </Text>
            <View style={{backgroundColor: "#F2F2FF", width: "100%", height: "90%", alignItems: "center"}}>
                <View style={{ width: "90%", height: 40, flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                    <TouchableOpacity onPress={() => setCategory(3)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 3 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 3 ? "#fff" : "#000"}}>دباب </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory(2)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 2 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 2 ? "#fff" : "#000"}}>نقل عام </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory(1)} style={{ width: "32%", justifyContent: "center", height: "100%", backgroundColor: category == 1 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center", color: "#fff"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 1 ? "#fff" : "#000"}}>خصوصي </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", height: 1, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 20}}>
                </View>
                <View style={{ width: "90%", height: 40, flexDirection: "column-reverse", justifyContent: "space-between"}}>
                    <Text style={{ fontFamily: "Small", fontSize: 12, color: "#000"}}>
                    المرجو إدخال الحروف و الأ رقام التي تبحت عنها
                    </Text>
                </View>

                  {/* box search */}
                <View style={{ width: "90%", height: 134, flexDirection: "row", backgroundColor: "#fff", borderRadius: 26, borderWidth: 2}}>

                    <View style={{ width: "87%", height: "100%", justifyContent: "center", alignItems: "center", borderRightWidth: 2, borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                        {/* top */}
                        <View style={{ width: "100%", height: "49%", flexDirection: "row",  borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 3)}
                                    value={arthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 2)}
                                    value={arsecondnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_en_num(text, 1)}
                                    value={arfirstnumber}
                                    maxLength={1}
                                />
                            </View>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
                                <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_en(text, 3)}
                                        value={arthirdletter}
                                        maxLength={1}
                                    />
                                    <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
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
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 3)}
                                    value={engthirdnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                                    placeholderTextColor="#000"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 2)}
                                    value={engsecondnumber}
                                    maxLength={1}
                                />
                                <TextInput
                                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                    placeholderTextColor="#959"
                                    keyboardType="numeric"
                                    onChangeText={(text) => to_ar_num(text, 1)}
                                    value={engfirstnumber}
                                    maxLength={1}
                                />
                            </View>
                            <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
                            <TextInput
                                        style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                                        placeholderTextColor="#000"
                                        keyboardType="ascii-mode"
                                        onChangeText={(text) => to_ar(text, 3)}
                                        value={engthirdletter}
                                        maxLength={1}
                                    />
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

                <View style={{ width: "90%", borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>المدينة</Text>
                    <TextInput
                        style={{ width: "100%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingHorizontal: 15, borderRadius: 8, textAlign :  I18nManager.isRTL ? 'left' : 'right',}}
                        placeholderTextColor="#BCBCBC"
                        placeholder="المدينة"
                        keyboardType="ascii-mode"
                        onChangeText={console.log("kkkkk")}
                        value=""
                    />
                    <View style={{ width: "100%", height: 1, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 20}}>
                    </View>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>رقم الإعلان</Text>
                    <TextInput
                        style={{ width: "100%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingLeft: 15, borderRadius: 8}}
                        placeholderTextColor="#BCBCBC"
                        placeholder="012345"
                        keyboardType="ascii-mode"
                        onChangeText={console.log("kkkkk")}
                        value=""
                    />
                </View>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}>بحث</Text>
                    </TouchableOpacity> 

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
        }
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
        width: '90%',
        marginTop: 50,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#678DF9',
        borderRadius: 8,
    }
});