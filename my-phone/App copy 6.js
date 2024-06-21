import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const WelcomeScreen = ({ navigation, route }) => {
  const highScore = route.params?.highScore ?? 0;
  const size = route.params?.size ?? 100;
  const color = route.params?.color ?? "red";
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>High Score: {highScore}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Main", { size, color, highScore });
        }}
      >
        <Text style={styles.text}>Play</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Setting", { size, color, highScore });
        }}
      >
        <Text style={styles.text}>Setting</Text>
      </Pressable>
    </View>
  );
};
const SettingScreen = ({ navigation, route }) => {
  let { highScore } = route.params;
  const [size, setSize] = useState(route.params?.size ?? 100);
  const [color, setColor] = useState(route.params?.color ?? "red");
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 40 }}>Setting</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32 }}>Size: </Text>
        <TextInput
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
          }}
          style={{ padding: 10, borderColor: "gray", borderWidth: 2 }}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Text style={{ fontSize: 32 }}>Color: </Text>
        <TextInput
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          style={{ padding: 10, borderColor: "gray", borderWidth: 2 }}
        />
      </View>
      <Button
        title="Save"
        onPress={() => {
          navigation.navigate("Welcome", {
            size,
            color,
            highScore,
          });
        }}
      />
    </View>
  );
};
const MainScreen = ({ navigation, route }) => {
  const [score, setScore] = useState(0);
  let { size, color, highScore } = route.params;
  const [position, setPosition] = useState({ x: 300, y: 50 });
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((v) => v - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (score > highScore) highScore = score;
      navigation.navigate("Welcome", { size, color, highScore });
    }
  }, [count]);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setScore((v) => v + 1);
          setPosition((v) => {
            const new_pos = { ...v };
            new_pos.x = Math.random() * 800;
            new_pos.y = Math.random() * 500;
            return new_pos;
          });
        }}
        style={{ position: "absolute", left: position.x, top: position.y }}
      >
        <View
          style={{ height: size, width: size, backgroundColor: color }}
        ></View>
      </Pressable>
      <Text
        style={{ position: "absolute", left: 1000, top: 200, fontSize: 40 }}
      >
        Time: {count}
      </Text>
      <Text
        style={{ position: "absolute", left: 1200, top: 400, fontSize: 32 }}
      >
        High Score: {highScore}
      </Text>
      <Text
        style={{ position: "absolute", left: 1000, top: 400, fontSize: 32 }}
      >
        Score: {score}
      </Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: 200,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default App;
