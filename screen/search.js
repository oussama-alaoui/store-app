import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Search({navigation}) {
    const [category, setCategory] = useState(1);

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
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
            <View style={{top: "5%" ,backgroundColor: "#F2F2FF", width: "100%", height: "83%", alignItems: "center"}}>
                <View style={{ width: "80%", height: "80%", backgroundColor: "#F2F2FF", flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                    <TouchableOpacity onPress={() => setCategory(3)} style={{ width: "32%", justifyContent: "center", height: "10%", backgroundColor: category == 3 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 3 ? "#fff" : "#000"}}>دباب </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory(2)} style={{ width: "32%", justifyContent: "center", height: "10%", backgroundColor: category == 2 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 2 ? "#fff" : "#000"}}>نقل عام </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory(1)} style={{ width: "32%", justifyContent: "center", height: "10%", backgroundColor: category == 1 ? "#6997FC" : "#F2F2FF", borderRadius: 10, alignItems: "center", color: "#fff"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 18, color: category == 1 ? "#fff" : "#000"}}>خصوصي </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        
    },
});