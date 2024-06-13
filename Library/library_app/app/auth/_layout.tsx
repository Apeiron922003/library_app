import { Tabs, router } from "expo-router";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import BackButton from "@/components/library/BackButton";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              style={{ padding: 10 }}
              onPress={() => {
                router.push("/library");
              }}
            >
              <AntDesign name="home" size={24} color="black" />
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="login"
                size={24}
                color={focused ? color : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name="adduser"
                size={24}
                color={focused ? color : "black"}
              />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
