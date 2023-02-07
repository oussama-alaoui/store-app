import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { GetData } from './Syncstorage'
import { db, collection, getDocs, query, addDoc, where } from "../firebase";


export function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user_id, setUserid] = useState([]);

  useEffect(() => {
    GetData('user_id').then((value) => {
      setUserid(value);
    });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    try{
      var newmessage = messages[0];
      const data = {
        _id: newmessage._id,
        text: newmessage.text,
        createdAt: newmessage.createdAt,
        user: {
          _id: newmessage.user._id,
        }
      }
      
    }catch(e){
      console.log(e);
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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