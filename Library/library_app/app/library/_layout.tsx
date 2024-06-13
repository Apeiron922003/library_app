import { Tabs, Link } from "expo-router";
import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@/components/library/Logo";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/components/library/BackButton";
import { UserService } from "@/services/user.service";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      setUser((await AsyncStorage.getItem("user")) as string);
    };
    getUser();
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="library-outline"
              size={24}
              color={focused ? color : "black"}
            />
          ),
          headerShown: true,
          headerTitle: () => <Logo size={24} />,
          headerRight: () => (
            <Link
              href="/auth"
              style={{ marginRight: 20 }}
              onPress={async () => {
                await UserService.logout();
              }}
            >
              {!user ? (
                <Text
                  style={{ fontSize: 20, fontWeight: 800, color: "#1588e8" }}
                >
                  Login
                </Text>
              ) : (
                <>
                  <View>
                    <Text style={{ fontSize: 18 }}>Xin chào,</Text>
                    <Text style={{ fontSize: 18 }}>{user}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="login-variant"
                    size={30}
                    color="black"
                  />
                </>
              )}
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={focused ? color : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="borrowed"
        options={{
          title: "Borrowed Books",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="book-clock-outline"
              size={24}
              color={focused ? color : "black"}
            />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="detailBook"
        options={{
          title: "Book Detail",
          href: null,
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
