import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Loadings from "./complement/loadings";
import { RemoveData, GetData } from "./Syncstorage";
import Matricule from './svg_assets/matricule'


export default function Favorite_product({navigation}) {
    const [articles, setArticles] = React.useState([]);
    const [user_id, setUser_id] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        GetData('user_id').then((res) => {
            setUser_id(res);
            console.log("user_id"+res);
            getArticles();
        });
    }, [true]);

    async function getArticles() {
        fetch(`https://newapi.mediaplus.ma/api/v1/favorites/from_id/${user_id}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            })
            .then((response) => response.json())
            .then((json) => {
                setArticles(json.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
        })
    }
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }
    if (loading) {
        return <Loadings/>;
    }
    else {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={{flex: 1, height: 100, width: "100%"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20, fontWeight: "bold", color: "#000", top: 10, marginBottom: 60}}>المفضلة</Text>

            
        </View>
    )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
        height: '100%',
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