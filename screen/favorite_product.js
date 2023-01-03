import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";


export default function Favorite_product() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={{flex: 1, backgroundColor: 'red', height: 100, width: "100%"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "#fff", top: 10}}>المفضلة</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        width: 45,
        height: 37,
        backgroundColor: '#f1f1f1',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
})