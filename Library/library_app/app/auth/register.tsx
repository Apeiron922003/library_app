import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Logo from "@/components/library/Logo";
import {
  Navigator,
  usePathname,
  Slot,
  Link,
  router,
  useGlobalSearchParams,
  Redirect,
} from "expo-router";
import { client } from "@/utils/client";
// @ts-ignore
const RegisterComponent = () => {
  const [full_name, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    if (password !== rePassword) {
      setMessage("Mật khẩu không khớp");
      setLoading(false);
    } else {
      const body = { full_name, username, password, rePassword };
      try {
        await client.post("auth/register", body);
        setMessage("Register Successfully");
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setMessage(error.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.textInput}
            value={full_name}
            placeholder="Full name"
            onChangeText={setFullname}
            id="full_name"
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Re-enter Password</Text>
          <TextInput
            style={styles.textInput}
            value={rePassword}
            placeholder="Re-enter Password"
            secureTextEntry
            onChangeText={setRePassword}
            id="rePassword"
          />
        </View>
        {message ? (
          <Text style={{ color: "red", fontStyle: "normal" }}>{message}</Text>
        ) : (
          ""
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterComponent;

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
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
