import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe();
  }, [auth]);

  function SignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace("Home"))
      .catch((error) => alert(error));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <StatusBar style="light" />
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../assets/logo.png")}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={SetEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={SetPassword}
        />
      </View>

      <Button containerStyle={styles.button} title={"Login"} onPress={SignIn} />
      <Button
        containerStyle={styles.button}
        title={"Register"}
        type="outline"
        onPress={() =>
          navigation.navigate("Registration", {
            passedEmail: email,
            passedPassword: password,
          })
        }
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
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
