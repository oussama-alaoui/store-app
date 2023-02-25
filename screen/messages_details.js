import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { GetData } from './Syncstorage'
import { db, collection, getDocs, query, addDoc, where, orderBy, onSnapshot } from "../firebase";


export function ChatScreen({ route, navigation}) {
  const [messages, setMessages] = useState([]);
  const [user_id, setUserid] = useState([]);

  useEffect(() => {
    GetData('user_id').then((value) => {
      setUserid(value);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `rooms/${route.params.room_id}/messages`), orderBy('createdAt', 'desc')),
      (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const message = doc.data();
          messages.push({
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt.toDate(),
            user: {
              _id: message.user._id,
            }
          });
        });
        setMessages(messages);
      }
    );
  
    return () => {
      unsubscribe(); // detach the listener when the component unmounts
    };
  }, [route.params.room_id]);  
  

  const onSend = useCallback(async (messages = []) => {
    try{
      var newmessage = messages[0];
      const data = {
        _id: newmessage._id,
        text: newmessage.text,
        createdAt: new Date(),
        user: {
          _id: newmessage.user._id,
        }
      }
      const newMessageRef = await addDoc(collection(db, `rooms/${route.params.room_id}/messages`), data);
      console.log("Document written with ID: ", newMessageRef.id);
    }catch(e){
      console.log(e);
    }
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user_id,
      }}
    />
  )
}

export default ChatScreen;