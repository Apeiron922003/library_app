import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const WelcomeScreen = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [progressPercentage, setProgressPercentage] = useState(0);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Main");
    });
    progress.addListener(({ value }) => {
      setProgressPercentage(value.toFixed(2));
    });
    return () => {
      progress.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to My App!</Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: "center" }}>loading ...</Text>
        <View style={{ width: 100, marginVertical: 10 }}>
          <Animated.View style={[styles.bar, { width: progress }]} />
        </View>
        <Animated.View>
          <Text
            style={{ textAlign: "center" }}
          >{`${progressPercentage}%`}</Text>
        </Animated.View>
      </View>
    </View>
  );
};
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Main Screen</Text>
      <Button
        title="Refresh"
        onPress={() => {
          navigation.navigate("Welcome");
        }}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Main" component={MainScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    height: 20,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});
export default App;
