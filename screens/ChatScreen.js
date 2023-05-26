import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLayoutEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { auth, db } from "../firebase";

export default function ChatScreen({ navigation, route }) {
  const [input, SetInput] = useState("");
  const [messages, SetMessages] = useState([]);

  const { id, chatName } = route.params;
  const reactnavHeaderHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat - " + chatName,
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={styles.headerTitleView}>
          <Avatar
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            }}
          />
          <Text style={styles.headerText}>{chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={"white"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  function SendMessage() {
    if (input === "") return;
    // Keyboard.dismiss(); // Not user-friendly

    addDoc(collection(db, "chats", id, "messages"), {
      timestamp: serverTimestamp(),
      userID: id,
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    SetInput("");
  }

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) =>
        SetMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={styles.container}
        keyboardVerticalOffset={reactnavHeaderHeight}
      >
        <ScrollView contentContainerStyle={{ paddingVertical: 5 }}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.sender}>
                <Avatar
                  position="absolute"
                  rounded
                  //WEB
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  bottom={-15}
                  right={-5}
                  size={30}
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.receiver}>
                <Avatar
                  position="absolute"
                  rounded
                  //WEB
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  bottom={-15}
                  left={-5}
                  size={30}
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.receiverText}>{data.message}</Text>
                <Text style={styles.receiverName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="Signal Message"
            style={styles.footerInput}
            value={input}
            onChangeText={SetInput}
            blurOnSubmit={false}
            onSubmitEditing={SendMessage}
          />
          <TouchableOpacity onPress={SendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color={"#2B68E6"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitleView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  headerText: {
    color: "white",
    marginLeft: 15,
    fontWeight: "700",
    fontSize: 18,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 10,
  },
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receiverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  footerInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
