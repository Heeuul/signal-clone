import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLayoutEffect } from "react";
import { useState } from "react";
import React from "react";

import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddChat({ navigation }) {
  const [chatName, SetChatName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, []);

  async function CreateChat() {
    await addDoc(collection(db, "chats"), { chatName: chatName })
      .then(() => navigation.goBack())
      .catch((error) => alert(error));
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chatName}
        onChangeText={SetChatName}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color={"black"} />
        }
      />
      <Button
        title={"Create New Chat"}
        onPress={CreateChat}
        disabled={!chatName}
        disabledStyle={{ backgroundColor: "lightgray" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
