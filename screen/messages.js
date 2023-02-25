import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db, collection, getDocs, query, addDoc, where, orderBy, limit } from "../firebase";
import { GetData } from "./Syncstorage";
import Loadings from "./complement/loadings";


export default function Messages({navigation}) {
    const [Number, setNumber] = useState();
    const [rooms, setRooms] = useState(null);
    const [user_id, setUserid] = useState([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetData('user_id').then((value) => {
                setUserid(value);
                getRoomsWithLatestMessages(value);
            });
        });
        return unsubscribe;
    }, [navigation]);

    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Loadings/>;
    }

    async function getUserInfo(userId) {
        try {
          const response = await fetch(`https://newapi.mediaplus.ma/api/v1/clients/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });
          const json = await response.json();
          return json.data;
        } catch (error) {
          console.error(error);
        }
      }

    async function getRoomsWithLatestMessages(user_id) {
        // Get all room documents where user1 or user2 match the user's ID
        const roomsCol = collection(db, "rooms");
        if(user_id == 1)
            var q = query(roomsCol, where("user2", "==", user_id));
        else
            var q = query(roomsCol, where("user1", "==", user_id));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const roomsarray = [];
        querySnapshot.forEach(async (roomDoc) => {
            const room = roomDoc.data();
            room.id = roomDoc.id;
            // Get the latest message for this room
            const messagesCol = collection(db, `rooms/${roomDoc.id}/messages`);
            const messageQuery = query(messagesCol, orderBy("createdAt", "desc"), limit(1));
            const messageSnapshot = await getDocs(messageQuery);
            if (!messageSnapshot.empty) {
                const latestMessage = messageSnapshot.docs[0].data();
                room.latestMessage = latestMessage;
            }
            // Get the other user's info
            const otherUserId = room.user1 === user_id ? room.user2 : room.user1;
            room.otherUser = await getUserInfo(otherUserId);
            roomsarray.push(room);
            console.log(rooms);
            setRooms(roomsarray);
        });
    }
    if (rooms == null)
        return <Loadings/>
    if(rooms.length == 0) {
        return (
           <View style={[styles.container, {justifyContent:"center"}]}>
                <Image source={require('../assets/warning.png')} style={{width: 76.5 * 2.5, height :57.8 * 2.5}}/>
                <Text style={{fontFamily: "Bold", fontSize: 16, color: "#6C63FF", marginBottom: 20}}>صندوق الوارد الخاص بك فارغ</Text>
           </View>
        )
    }
    else{
        return (
            <View style={styles.container}>
                <Text style={{fontFamily: "Bold", fontSize: 20, color: "#6C63FF", marginVertical: 15}}>صندوق الوارد</Text>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: '#6C63FF', height: 2, opacity: 0.3}}></View>
                {rooms.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={{ width: "100%", height: 90, flexDirection: 'row-reverse', backgroundColor: 'rgba(108, 99, 255, .05)', alignItems: "center", paddingHorizontal:15, borderBottomWidth:1, borderBottomColor:'rgba(108, 99, 255, .2)'}} 
                        onPress={() => navigation.navigate("ChatScreen", {room_id: item.id})}
                    >
                        <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4, marginLeft: 10}}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                        <View style={{height: 80, justifyContent: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D', fontWeight: 'bold', textAlign:'right'}}>
                            {item.otherUser.username}
                        </Text>
                        <Text style={{ fontFamily: "Bold", fontSize: 12, color: '#000', textAlign:'right'}}>
                            {item.latestMessage.text}
                        </Text>
                        </View>
                    </TouchableOpacity>
                ))}
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },

});
