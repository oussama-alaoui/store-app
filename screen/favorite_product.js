import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Modal } from "react-native-web";


export default function Favorite_product() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <Modal animationType="slide" transparent={true} visible={true} style={{width: '50%', height: '50%', flex:1, top: 0}}>
                    <View >
                        <Text style={{fontSize: 108, fontWeight: 'bold', marginBottom: 10, color: "#000"}}>Modal Title</Text>
                        {/* <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
                        onChangeText={text => setInputValue(text)}
                        value={inputValue}
                        />
                        <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text>Submit</Text>
                        </TouchableOpacity> */}
                    </View>
            </Modal>
            <View style={{flex: 1, height: 100, width: "100%"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "#000", top: 10}}>المفضلة</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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