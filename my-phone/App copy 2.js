import { useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [state, setState] = useState(false);
  const minute = useRef(0);
  const second = useRef(0);
  const timer = useRef();
  const [time, setTime] = useState("00:00");
  const getTime = () => {
    const timeCount =
      (minute.current < 10 ? "0" + minute.current : minute.current) +
      ":" +
      (second.current < 10 ? "0" + second.current : second.current);
    setTime(timeCount);
  };
  const handlePress = () => {
    setState(!state);
    if (state) {
      clearInterval(timer.current);
    } else {
      timer.current = setInterval(() => {
        second.current++;
        if (second.current == 60) {
          minute.current++;
          second.current = 0;
        }
        getTime();
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 40 }}>{time}</Text>
      <View>
        <Button
          title={state ? "Dừng lại" : "Bắt đầu"}
          onPress={handlePress}
          color={state ? "red" : "green"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },
});
