import { StyleSheet, Text, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  logoContainer: {
    marginVertical: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1588e8",
  },
});
// @ts-ignore
const Logo = ({ size = 40 }) => {
  return (
    <View style={styles.logoContainer}>
      <Text style={{ ...styles.logoText, fontSize: size }}>
        Library Manager
      </Text>
    </View>
  );
};

export default Logo;
