import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Add_product({navigation}) {
    const [Number, setNumber] = useState();
    // const [Date, setDate] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/Almarai-Light.ttf"),
        Bold: require("../assets/fonts/Almarai-Bold.ttf"),
        X_Bold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }


    return (
        
            <Text> add product </Text>
    )
}

const styles = StyleSheet.create({

});
