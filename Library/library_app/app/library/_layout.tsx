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
import { UserService } from "@/services/user.service";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { toast } from "@/utils/toast";

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
          headerTitle: () => <></>,
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Logo size={20} />
            </View>
          ),
          headerRight: () => (
            <Link
              href="/auth/login"
              style={{ marginRight: 20 }}
              onPress={async () => {
                if (user) {
                  try {
                    await UserService.logout();
                  } catch (error) {}
                }
              }}
            >
              {!user ? (
                <Text
                  style={{ fontSize: 18, fontWeight: 800, color: "#1588e8" }}
                >
                  Login
                </Text>
              ) : (
                <>
                  <View>
                    <Text style={{ fontSize: 14 }}>Xin chào,</Text>
                    <Text style={{ fontSize: 14 }}>{user}</Text>
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
