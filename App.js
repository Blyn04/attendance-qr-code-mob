import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import AttendanceQR from "./components/AttendanceQR";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="AttendanceQR" component={AttendanceQR} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
