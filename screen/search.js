import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import Loadings from "./complement/loadings";

export default function Search({navigation}) {
    const [category, setCategory] = useState(2);
    const [data, setData] = useState([{}]);
    const [city, setCity] = useState(null);
    const en_input1 = useRef();
    const en_input2 = useRef();
    const en_input3 = useRef();
    const en_input4 = useRef();
    const en_input5 = useRef();
    const en_input6 = useRef();
    const en_input7 = useRef();

    const ar_input1 = useRef();
    const ar_input2 = useRef();
    const ar_input3 = useRef();
    const ar_input4 = useRef();
    const ar_input5 = useRef();
    const ar_input6 = useRef();
    const ar_input7 = useRef();

    const [ID, setID] = useState("");

    const [enNum, setEnNum] = useState({a: "", b: "", c :"", d: ""});
    const [enAlpha, setEnAlpha] = useState({e: "", f: "", g :""});

    const [arNum, setArNum] = useState({a: "", b: "", c :"", d: ""});
    const [arAlpha, setArAlpha] = useState({e: "", f: "", g :""});

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
        .then((json) => setData([{"key": 'null', "value": "إختر مدينة"}, ...json.data]))
        .catch((error) => console.error(error))
        .finally(() => console.log(data));
    }, []);
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }

    return (
        console.log(category),
        <View style={styles.container}>
            <Text style={{ fontFamily: "X_Bold", fontSize: 26, marginTop: 20, marginRight: 10, color: "#302C6B"}}>
                البحث على إعلان
            </Text>
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
                <View style={{ width: "90%", height: 1, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 15}}>
                </View>
                <View style={{ width: "90%", height: 40, flexDirection: "column-reverse", justifyContent: "space-between"}}>
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
                onChangeText={(text) => put_ar_number(text, 'a')}
                value={arNum.a}
                maxLength={1}
                ref={ar_input1}
            />
            ):(
                <></>
            )
            }
            <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                placeholderTextColor="#000"
                keyboardType="numeric"
                onChangeText={(text) => put_ar_number(text, 'b')}
                value={arNum.b}
                maxLength={1}
                ref={ar_input2}
            />
            <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                placeholderTextColor="#959"
                keyboardType="numeric"
                onChangeText={(text) => put_ar_number(text, 'c')}
                value={arNum.c}
                maxLength={1}
                ref={ar_input3}
            />
                <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                placeholderTextColor="#959"
                keyboardType="numeric"
                onChangeText={(text) => put_ar_number(text, 'd')}
                value={arNum.d}
                maxLength={1}
                ref={ar_input4}
            />
        </View>
        <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
            
            <TextInput
                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                    placeholderTextColor="#000"
                    keyboardType="ascii-mode"
                    onChangeText={(text) => put_ar_alpha(text, 'e')}
                    value={arAlpha.e}
                    maxLength={1}
                    ref={ar_input5}
                />
            
                <TextInput
                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                    placeholderTextColor="#000"
                    keyboardType="ascii-mode"
                    onChangeText={(text) => put_ar_alpha(text, 'f')}
                    value={arAlpha.f}
                    maxLength={1}
                    ref={ar_input6}
                />
                {category != 0 ?
                <TextInput
                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                    placeholderTextColor="#959"
                    keyboardType="ascii-mode"
                    onChangeText={(text) => put_ar_alpha(text, 'g')}
                    value={arAlpha.g}
                    maxLength={1}
                    ref={ar_input7}
                />
                :(<></>)}
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
                onChangeText={(text) => put_en_number(text, 'a')}
                value={enNum.a}
                maxLength={1}
                ref={en_input1}
            />
            ):(
                <></>
            )
            }
            <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                placeholderTextColor="#000"
                keyboardType="numeric"
                onChangeText={(text) => put_en_number(text, 'b')}
                value={enNum.b}
                maxLength={1}
                ref={en_input2}
            />
            <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                placeholderTextColor="#959"
                keyboardType="numeric"
                onChangeText={(text) => put_en_number(text, 'c')}
                value={enNum.c}
                maxLength={1}
                ref={en_input3}
            />
                <TextInput
                style={{ width: "20%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                placeholderTextColor="#959"
                keyboardType="numeric"
                onChangeText={(text) => put_en_number(text, 'd')}
                value={enNum.d}
                maxLength={1}
                ref={en_input4}
            />
        </View>
        <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: '#fff', borderLeftWidth: 2}}>
                <TextInput
                    style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                    placeholderTextColor="#000"
                    keyboardType="ascii-mode"
                    onChangeText={(text) => put_en_alpha(text, 'e')}
                    value={enAlpha.e}
                    maxLength={1}
                    ref={en_input5}
                    />
                <TextInput
                style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2, paddingLeft: 15}}
                placeholderTextColor="#000"
                keyboardType="ascii-mode"
                onChangeText={(text) => put_en_alpha(text, 'f')}
                value={enAlpha.f}
                maxLength={1}
                ref={en_input6}
                />
            {category != 0 ?
                <TextInput
                style={{ width: "25%", height: "60%", fontFamily: "Bold", fontSize: 24, color: "#000", textAlign: "right", borderBottomWidth: 2}}
                placeholderTextColor="#9591B0"
                keyboardType="ascii-mode"
                onChangeText={(text) => put_en_alpha(text, 'g')}
                value={enAlpha.g}
                maxLength={1}
                ref={en_input7}
                />
            :(<></>)}
        </View>
    </View>
</View>
</View>

                <View style={{ width: "90%", borderBottomLeftRadius: 26, borderTopLeftRadius: 26}}>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>المدينة</Text>
                    <SelectList 
                        setSelected={(val) => setCity(val)} 
                        data={data}
                        save="key"
                    />
                    <View style={{ width: "100%", height: 1, backgroundColor: '#CAC7C7', borderRadius: 20, flexDirection: 'row', justifyContent: "space-around", marginTop: 20}}>
                    </View>
                    <Text style={{ width: "100%", fontFamily: "Bold", fontSize: 15, color: "#000", marginTop: 10}}>رقم الإعلان</Text>
                    <TextInput
                        style={{ width: "100%", height: 40, fontFamily: "Bold", fontSize: 15, color: "#000", backgroundColor: "#fff", paddingLeft: 15, borderRadius: 8}}
                        placeholderTextColor="#BCBCBC"
                        placeholder="012345"
                        keyboardType="numeric"
                        onChangeText={(val) => setID(val)} 
                        value={ID}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => searchNow()}
                >
                    <Text style={{fontFamily: 'Bold',fontWeight: '600',fontSize: 16, color: 'white'}}>بحث</Text>
                </TouchableOpacity> 

            </View>
        </View>
    )

    function searchNow()
    {
        let args = "https://newapi.mediaplus.ma/api/v1/articles/search/"
        console.log(args);
        if (ID == "")
            args += "null/"
        else
            args += ID+"/"
        if (city == null)
            args += "null/"
        else
            args += city+"/"
        
            
        let numSum = ""
        if (category == 0)
        numSum = enNum.b+enNum.c+enNum.d
        else
        numSum = enNum.a+enNum.b+enNum.c+enNum.d
        if (numSum == "")
        args += "null/"
        else
        args += numSum+"/"
        
        let alphaSum = ""
        if (category == 0)
            alphaSum = enAlpha.e+enAlpha.f
        else
            alphaSum = enAlpha.e+enAlpha.f+enAlpha.g
        if (alphaSum == "")
            args += "null"
        else
            args += alphaSum
        
        console.log('city : ', city)
        console.log('ID : ', ID)
        console.log('enNum : ', enNum)
        console.log('enAlpha : ', enAlpha)
        console.log('link : ', args)
        navigation.navigate('Search_results', {url: args})
    }

    function validator(accepted, value)
    {
        if (value == "")
            return (true)
        if (value.length > 1)
            return (false)
        if (accepted.includes(value))
            return (true)
        return (false)
    }

    function translate_num_ar(input)
    {
        var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
        var en = '0123456789'.split('');
        return input.replace(/[0123456789]/g, x => ar[en.indexOf(x)]);
    }

    function change_focus(position, mode)
    {
        if (mode)
        {
            if (position == 'a')
                en_input2.current.focus()
            else if (position == 'b')
                en_input3.current.focus()
            else if (position == 'c')
                en_input4.current.focus()
            else if (position == 'd')
                en_input5.current.focus()
            else if (position == 'e')
                en_input6.current.focus()
            else if (position == 'f' && category != 0)
                en_input7.current.focus()
        }
        else
        {
            if (position == 'a')
                ar_input2.current.focus()
            else if (position == 'b')
                ar_input3.current.focus()
            else if (position == 'c')
                ar_input4.current.focus()
            else if (position == 'd')
                ar_input5.current.focus()
            else if (position == 'e')
                ar_input6.current.focus()
            else if (position == 'f' && category != 0)
                ar_input7.current.focus()
        }
    }
    function put_en_number(num, position, mode = 1)
    {
        if (validator("0123456789", num) == false)
            return
        if (position == 'a')
        {
            setEnNum({...enNum, a: num})
            setArNum({...arNum, a: translate_num_ar(num)})
        }
        if (position == 'b')
        {
            setEnNum({...enNum, b: num})
            setArNum({...arNum, b: translate_num_ar(num)})
        }
        if (position == 'c')
        {
            setEnNum({...enNum, c: num})
            setArNum({...arNum, c: translate_num_ar(num)})
        }
        if (position == 'd')
        {
            setEnNum({...enNum, d: num})
            setArNum({...arNum, d: translate_num_ar(num)})
        }
        if (num != "")
            change_focus(position, mode)
    }

    function put_ar_number(num, position)
    {
        if (num == "")
            return put_en_number(num, position, 0)
        if (validator("٠١٢٣٤٥٦٧٨٩0123456789", num) == false)
            return
        if ("٠١٢٣٤٥٦٧٨٩".indexOf(num) != -1)
        {
            const eng = "0123456789"
            num = eng["٠١٢٣٤٥٦٧٨٩".indexOf(num)]
        }
        put_en_number(num, position, 0)
    }





    function translate_alpha_ar(input)
    {
        console.log('input : ', input)
        var ar = 'أبحدرسصطعقكلمنهوى'.split('');
        var en = 'ABJDRSXTEGKLZNHUV'.split('');
        return input.replace(/[ABJDRSXTEGKLZNHUV]/g, x => ar[en.indexOf(x)]);
    }

    function put_en_alpha(num, position, mode = 1)
    {
        if (validator("ABJDRSXTEGKLZNHUV", num) == false)
            return
        if (position == 'e')
        {
            setEnAlpha({...enAlpha, e: num})
            setArAlpha({...arAlpha, e: translate_alpha_ar(num)})
        }
        else if (position == 'f')
        {
            setEnAlpha({...enAlpha, f: num})
            setArAlpha({...arAlpha, f: translate_alpha_ar(num)})
        }
        else if (position == 'g')
        {
            setEnAlpha({...enAlpha, g: num})
            setArAlpha({...arAlpha, g: translate_alpha_ar(num)})
        }
        if (num != "")
            change_focus(position, mode)
    }

    function put_ar_alpha(num, position)
    {
        if (num == "")
            return put_en_alpha(num, position, 0)
        console.log('num : ', num)
        if (num == "ا" || num == "آ" || num == "إ"){num = "أ";}
        if (validator("ABJDRSXTEGKLZNHUVأبحدرسصطعقكلمنهوى", num) == false)
            return
        if ("أبحدرسصطعقكلمنهوى".indexOf(num) != -1)
        {
            const eng = "ABJDRSXTEGKLZNHUV"
            num = eng["أبحدرسصطعقكلمنهوى".indexOf(num)]
        }

        //console.log(num);return

        put_en_alpha(num, position, 0)
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