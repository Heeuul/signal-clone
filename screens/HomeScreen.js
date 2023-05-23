import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";

import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

export default function HomeScreen({ navigation }) {
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
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
}
