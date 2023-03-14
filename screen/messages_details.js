// import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat'
// import { GetData } from './Syncstorage'
// import { db, collection, getDocs, query, addDoc, where, orderBy, onSnapshot } from "../firebase";


// export function ChatScreen({ route, navigation}) {
//   const [messages, setMessages] = useState([]);
//   const [user_id, setUserid] = useState([]);

//   useEffect(() => {
//     GetData('user_id').then((value) => {
//       setUserid(value);
//     });
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, `rooms/${route.params.room_id}/messages`), orderBy('createdAt', 'desc')),
//       (querySnapshot) => {
//         const messages = [];
//         querySnapshot.forEach((doc) => {
//           const message = doc.data();
//           messages.push({
//             _id: message._id,
//             text: message.text,
//             createdAt: message.createdAt.toDate(),
//             user: {
//               _id: message.user._id,
//             }
//           });
//         });
//         setMessages(messages);
//       }
//     );
  
//     return () => {
//       unsubscribe(); // detach the listener when the component unmounts
//     };
//   }, [route.params.room_id]);  
  

//   const onSend = useCallback(async (messages = []) => {
//     try{
//       var newmessage = messages[0];
//       const data = {
//         _id: newmessage._id,
//         text: newmessage.text,
//         createdAt: new Date(),
//         user: {
//           _id: newmessage.user._id,
//         }
//       }
//       const newMessageRef = await addDoc(collection(db, `rooms/${route.params.room_id}/messages`), data);
//       console.log("Document written with ID: ", newMessageRef.id);
//     }catch(e){
//       console.log(e);
//     }
//   }, [])

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: user_id,
//       }}
//     />
//   )
// }

// export default ChatScreen;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { GetData } from './Syncstorage'
import { debounce } from 'lodash';
import { db, collection, getDocs, query, addDoc, where, orderBy, onSnapshot } from "../firebase";

const ChatScreen = ({navigation, route}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [user_id, setUserid] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

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
        setLoading(false);
      }
    );
  
    return () => {
      unsubscribe(); // detach the listener when the component unmounts
    };
  }, [route.params.room_id]);

  function onSend (){
    try{
      const data = {
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 5,
        }
      }
      const newMessageRef = addDoc(collection(db, `rooms/${route.params.room_id}/messages`), data);
      console.log("Document written with ID: ", newMessageRef.id);
      setInputText('');
    }
    catch(e){
      console.log(e);
    }
  }

  const delayedSetInputValue = useCallback(
    debounce((value) => {
      setInputValue(value);
    }, 300), // wait 300 milliseconds before updating the state
    [] // no dependencies since debounce will handle the updates
  );

  const handleInputChange = (text) => {
    delayedSetInputValue(text);
  };

  return (
    console.log(route.params.otherUser),
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
          <Image
              style={{ width: 24, height: 24}}
              source={require("../assets/back.png")}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('User_Profile', {user_id: route.params.otherUser.id})} >
        <Text style={styles.title}>{route.params.otherUser.username}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.body}>
      <ScrollView ref={scrollViewRef}>
        {messages.reverse().map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.user._id === 5
                ? styles.outgoingMessageContainer
                : styles.incomingMessageContainer,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.user._id === 5
                  ? styles.outgoingMessageText
                  : styles.incomingMessageText,
              ]}
            >
              {message.text}
            </Text>
            <Text
              style={[
                styles.messageTime,
                message.user._id === 5
                  ? styles.outgoingMessageTime
                  : styles.incomingMessageTime,
              ]}
            >
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </View>
        ))}
      </ScrollView>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message here"
          />
          <TouchableOpacity onPress={onSend}>
            <Image source={require('../assets/send.png')} style={styles.sendButton} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E8FF',
    paddingHorizontal: 20,
  },
  buttonText: {
    width: 45,
    height: 37,
    backgroundColor: '#f1f1f1',
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
  },
  messageContainer: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  incomingMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7E8FF',
  },
  outgoingMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#B1B5FF',
  },
  messageText: {
    fontSize: 16,
  },
  incomingMessageText: {
    color: '#000',
  },
  outgoingMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  incomingMessageTime: {
    color: '#888',
  },
  outgoingMessageTime: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#E0E3FF',
    width: '90%',
    borderRadius: 20,
    direction: 'rtl',
    paddingHorizontal: 20,
  },
  sendButton: {
    width: 30,
    height: 30,

  },
});

export default ChatScreen;
