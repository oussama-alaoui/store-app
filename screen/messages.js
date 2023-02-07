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


export default function Messages({navigation}) {
    const [Number, setNumber] = useState();
    const [rooms, setRooms] = useState([]);
    const [user_id, setUserid] = useState([]);
    // const [Date, setDate] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());
    useEffect(() => {
        GetData('user_id').then((value) => {
            setUserid(value);
        });
    }, []);
    useEffect(() => {
        console.log(user_id);
        getRoomsWithLatestMessages(user_id);
    }, []);
    let [fontsLoaded] = useFonts({
        Small: require("../assets/fonts/NotoSansArabic-Light.ttf"),
        Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
        X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
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

    async function getRoomsWithLatestMessages(userId) {
        // Get all room documents where user1 or user2 match the user's ID
        const roomsCol = collection(db, "rooms");
        const q = query(roomsCol, where("user1", "==", userId));
        const querySnapshot = await getDocs(q);
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
            // console.log(await getUserInfo(otherUserId));
            roomsarray.push(room);
            console.log(rooms);
            setRooms(roomsarray);
        });
    }

    if(rooms.length == 0) {
        return (
           <Text style={{fontFamily: "Bold", fontSize: 26, color: "#000", marginTop: 20, marginBottom: 20}}>لا يوجد رسائل</Text>
        )
    }
    else{
        return (
            <View style={styles.container}>
                <Text style={{fontFamily: "Bold", fontSize: 26, color: "#000", marginTop: 20, marginBottom: 20}}>الرسائل</Text>
                <View style={{width: "100%", paddingHorizontal: 20, backgroundColor: 'gray', height: 1.5, opacity: 0.3}}></View>
                {rooms.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={{ width: "100%", height: 90, borderRadius: 20, flexDirection: 'row-reverse', alignItems: "center", marginLeft: "4%"}} 
                        onPress={() => navigation.navigate("ChatScreen", {room_id: item.id})}
                    >
                        <View style={{ width: 60, height: 60, alignItems: "center", justifyContent: "center", backgroundColor: '#fff', borderRadius: 100, borderColor: "#4584FF", borderWidth: 4}}>
                        <Image style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 30}} source={require("../assets/user_1.png")}/>
                        </View>
                        <View style={{height: 80, justifyContent: "center"}}>
                        <Text style={{ fontFamily: "Bold", fontSize: 14, color: '#020D6D'}}>
                            {item.otherUser.username}
                        </Text>
                        <Text style={{ fontFamily: "Bold", fontSize: 12, color: '#000', marginRight: 10}}>
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
