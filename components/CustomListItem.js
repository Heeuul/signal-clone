import { Avatar, ListItem } from "react-native-elements";
import { StyleSheet } from "react-native";
import React from "react";

export default function CustomListItem({ id, chat, EnterChat }) {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Youtube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Subtitle for testing Subtitle for testing Subtitle for testing
          Subtitle for testing
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
