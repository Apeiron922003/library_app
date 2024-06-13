import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Logo from "@/components/library/Logo";
import { router, useFocusEffect } from "expo-router";
import { client } from "@/utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const { data } = await client.post("/auth/login", { username, password });
      setMessage("Login Successfully!");
      setUsername("");
      setPassword("");
      await AsyncStorage.setItem("access_token", data.data.access_token);
      await AsyncStorage.setItem("refresh_token", data.data.refresh_token);
      const {
        data: {
          data: { full_name },
        },
      } = await client.get("/auth/profile");
      await AsyncStorage.setItem("user", full_name);
      setIsLoading(false);
      setMessage("");
      router.push({ pathname: `/library`, params: { user: full_name } });
    } catch (error: any) {
      setIsLoading(false);
      setMessage(error.error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            placeholder="Username"
            onChangeText={setUsername}
            id="username"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            id="password"
          />
        </View>
        {message ? (
          <Text style={{ color: "red", fontStyle: "normal" }}>{message}</Text>
        ) : (
          ""
        )}
        <TouchableOpacity
          style={{ ...styles.button, opacity: isLoading ? 0.5 : 1 }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading && (
            <ActivityIndicator animating={true} size="small" color="#1588e8" />
          )}
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
