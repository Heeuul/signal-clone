import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useState } from "react";

import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const [chats, SetChats] = useState([]);

  function SignOutUser() {
    signOut(auth).then(() => navigation.replace("Login"));
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      SetChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: auth?.currentUser?.displayName,
      headerStyle: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: "white",
      },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ padding: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={SignOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color={"black"}
              onPress={() => navigation.navigate("AddChat")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  function EnterChat(id, chatName) {
    navigation.navigate("Chat", { id, chatName });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            EnterChat={EnterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
