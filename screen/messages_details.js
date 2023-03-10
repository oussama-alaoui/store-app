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

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (inputText) {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Button Pressed')}>
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chat Title</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {messages.map((message, index) => (
            <View>
            <Text key={index} style={styles.messagesme}>{message}</Text>
            <Text key={index+1} style={styles.messageTime}>{new Date().toLocaleTimeString()}</Text>
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
            ref={inputRef}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  message: {
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    backgroundColor: '#ccc',
  },
  messageTime: {
    fontSize: 12,
    color: '#000',
  },
  messagesme: {
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    backgroundColor: 'green',
  },
  messageTimeMe: {
    fontSize: 12,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  sendButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ChatScreen;
