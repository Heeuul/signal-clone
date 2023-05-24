import { ScrollView, TouchableOpacity, View } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";
import { signOut } from "firebase/auth";

import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

export default function HomeScreen({ navigation }) {
  function SignOutUser() {
    signOut(auth).then(() => navigation.replace("Login"));
  }

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
            <SimpleLineIcons name="pencil" size={24} color={"black"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
}
