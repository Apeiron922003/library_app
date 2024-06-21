import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default function App() {
  const action = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animated.spring(action, {
      toValue: 300,
      stiffness: 100,
      mass: 30,
      damping: 1,
      restSpeedThreshold: 1,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ position: "relative", zIndex: 1 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderColor: "#FF6600",
            borderWidth: 4,
            backgroundColor: "#FF9933",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor: "black",
              borderRadius: "50%",
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          position: "relative",
          zIndex: 2,
          top: -50,
          left: 25,
          width: 50,
        }}
      >
        <Animated.Image
          source={require("./spring.png")}
          style={{ width: 50, height: action, position: "relative", zIndex: 2 }}
          resizeMode="stretch"
        />
        <View style={{ position: "absolute", zIndex: 0, top: -50, left: -25 }}>
          <Animated.View
            style={{
              width: 100,
              height: 100,
              borderColor: "#0066CC",
              borderWidth: 4,
              backgroundColor: "#33CCFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              position: "absolute",
              top: action,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "black",
                borderRadius: "50%",
              }}
            ></View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 50,
  },
});
