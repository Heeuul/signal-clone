import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { auth } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegistrationScreen({ navigation, route }) {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState(route.params.passedEmail);
  const [password, SetPassword] = useState(route.params.passedPassword);
  const [imageURL, SetImageURL] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  function Register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) =>
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageURL ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        })
      )
      .then(() => navigation.replace("Home"))
      .catch((error) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={SetName}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={SetEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          textContentType="newPassword"
          value={password}
          onChangeText={SetPassword}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          value={imageURL}
          onChangeText={SetImageURL}
          keyboardType="url"
          textContentType="URL"
        />
      </View>

      <Button
        containerStyle={styles.button}
        title={"Register Account"}
        onPress={Register}
        raised
        disabled={!name || !email || !password}
        disabledStyle={styles.disabledButton}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: { width: 300 },
  button: { width: 200, marginTop: 10 },
  disabledButton: { backgroundColor: "lightgray", width: 200, marginTop: 10 },
});
