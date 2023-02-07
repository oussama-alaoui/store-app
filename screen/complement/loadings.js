import React from "react";
import { View, Text, Image } from "react-native";

export default function Loadings() {
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width: 75, height: 75}} source={require("../../assets/loading.gif")}></Image>
            <Text>جاري التحميل ...</Text>
        </View> 
    )
}