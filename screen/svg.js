import React from "react";
import { View, Text } from "react-native";
import { WebView } from 'react-native-webview';

export default () => {
  return (
    <View style={{
      flexDirection: "column",
      height: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "white"
    }} >
          <View style={{
      height: 300,

    }}>
      <WebView
        scalesPageToFit={false}
         originWhitelist={['*']}
         domStorageEnabled={true}
         source={{uri: 'https://newapi.mediaplus.ma/storage/plates/motor.svg?number=200&alpha=dk'}}
         style={{
          width: 300,
          height: 300,
        }}
      />
      </View>
    </View>
  );
};


