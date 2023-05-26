import { Avatar, ListItem } from "react-native-elements";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase";

export default function CustomListItem({ id, chatName, EnterChat }) {
  const [lastChatMessage, SetLastChatMessage] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      ),
      (snapshot) => SetLastChatMessage(snapshot.docs.map((doc) => doc.data()))
    );

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => EnterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            lastChatMessage?.[0]?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastChatMessage?.[0]
            ? lastChatMessage[0].displayName + ": " + lastChatMessage[0].message
            : "Click here to start chatting!"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
