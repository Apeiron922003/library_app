import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";

const LoadingScreen = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#1588e8" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default LoadingScreen;
