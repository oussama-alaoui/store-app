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
  FlatList,
} from 'react-native';
import { GetData } from './Syncstorage'
import { db, collection, getDocs, query, addDoc, where, orderBy, onSnapshot } from "../firebase";
import { useFonts } from 'expo-font';
import Loadings from "./complement/loadings";
import { Keyboard } from 'react-native';


const ChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [user_id, setUserid] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();

  let [fontsLoaded] = useFonts({
    Small: require("../assets/fonts/NotoSansArabic-Thin.ttf"),
    Medium : require("../assets/fonts/NotoSansArabic-Medium.ttf"),
    Bold: require("../assets/fonts/NotoSansArabic-Bold.ttf"),
    X_Bold: require("../assets/fonts/NotoSansArabic-ExtraBold.ttf"),
    Black: require("../assets/fonts/NotoSansArabic-Black.ttf"),
  });
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
    
    if (!fontsLoaded) {
        return <Loadings/>;
    }


    const MessageInput = () => {
      const [inputText, setInputText] = useState('');
      const inputRef = useRef(null); // create a reference to the input element
    
      function onSend(text) {
        try {
          const data = {
            text: text,
            createdAt: new Date(),
            user: {
              _id: user_id,
            },
          };
          const newMessageRef = addDoc(
            collection(db, `rooms/${route.params.room_id}/messages`),
            data
          );
          setInputText(''); // clear the input text
          inputRef.current.focus(); // focus on the input element
        } catch (e) {
          console.log(e);
        }
      }
    
      return (
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputall}>
            <TouchableOpacity onPress={() => {onSend(inputText)}}>
              <Image source={require('../assets/send.png')} style={styles.sendButton} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef} // set the reference to the input element
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder=" اكتب رسالتك هنا"
            />
          </View>
        </KeyboardAvoidingView>
      );
    };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user._id === 5 ? styles.outgoingMessageContainer : styles.incomingMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.user._id === 5 ? styles.outgoingMessageText : styles.incomingMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          item.user._id === 5 ? styles.outgoingMessageTime : styles.incomingMessageTime,
        ]}
      >
        {new Date(item.createdAt).toLocaleTimeString([], {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('User_Profile', { user_id: route.params.otherUser.id })}
        >
          <Text style={styles.title}>{route.params.otherUser.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/back_messages.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <FlatList
          ref={scrollViewRef}
          data={messages}
          keyExtractor={(item) => item.createdAt.getTime().toString()}
          renderItem={renderMessage}
          inverted={true}
          contentContainerStyle={styles.messagesContainer}
          style={{ marginHorizontal: 20 }}
        />
        <MessageInput />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: "#0773BF",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
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
    color: '#fff',
    fontFamily: 'Medium',
  },
  body: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 0,
  },
  messageContainer: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  incomingMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2FC',
  },
  outgoingMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#395C82',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Medium',
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e3e3f4',
    height: 90,
    paddingHorizontal: 20,
  },
  inputall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderColor: '#9DB1C7',
    borderWidth: 1.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    direction: 'rtl',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    direction: 'rtl',
    fontFamily: 'Medium',
    paddingHorizontal: 5,
  },
  sendButton: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  button: {
    width: 45,
    height: 37,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
