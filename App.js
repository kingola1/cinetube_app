import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { Details, Person, Chat } from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Overview"}
      >
        <Stack.Screen name="Overview" component={Tabs} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Person" component={Person} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
