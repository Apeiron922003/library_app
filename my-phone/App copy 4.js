import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  FlatList,
  Animated,
} from "react-native";
const Noti = ({ data, removeNoti }) => {
  const [highlight, setHighlight] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan }]),
      onPanResponderRelease: (event, gs) => {
        const threshold = 100;
        if (gs.dx > threshold) {
          removeNoti(data.id);
        } else {
          Animated.spring(pan, {
            toValue: 0 - gs.dx,
            useNativeDriver: false,
          }).start();
        }
        pan.extractOffset();
      },
    })
  ).current;
  return (
    <View style={{ width: "100%", height: 150 }}>
      <View style={styles.notification}>
        <View style={styles.notiBackground}></View>
        <Animated.View
          style={{ transform: [{ translateX: pan }] }}
          {...panResponder.panHandlers}
        >
          <View style={styles.noti}>
            <Text selectable={false} style={{ fontWeight: 500 }}>
              {data.title}
            </Text>
            <Text selectable={false} style={{ width: 150, height: 50 }}>
              {data.content}
            </Text>
            <Text selectable={false} style={{ textAlign: "right" }}>
              {data.time}
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
export default function App() {
  const [initialData, setInitialData] = useState([
    {
      id: 0,
      title: "Shopping",
      content: "car washer, engine oil sale packet",
      time: "03-May-2019 1:38:49 AM",
    },
    {
      id: 1,
      title: "Banking",
      content: "send 5000 to krian",
      time: "03-May-2019 1:38:45 AM",
    },
    {
      id: 2,
      title: "Save Quotes",
      content: "talk is cheap, show me code",
      time: "03-May-2019 1:38:40 AM",
    },
    {
      id: 3,
      title: "Exam seat no",
      content: "X005723",
      time: "03-May-2019 1:38:38 AM",
    },
  ]);
  const removeNoti = (id) => {
    setInitialData((initialData) =>
      initialData.filter((item) => item.id !== id)
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 500,
            margin: 20,
          }}
        >
          Note
        </Text>
      </View>
      <FlatList
        data={initialData}
        renderItem={({ item }) => <Noti data={item} removeNoti={removeNoti} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 540,
    margin: 10,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 5,
  },
  notification: {
    position: "relative",
  },
  notiBackground: {
    width: "100%",
    height: 130,
    backgroundColor: "red",
    borderRadius: 5,
    position: "absolute",
    zIndex: 0,
    borderColor: "red",
    borderWidth: 2,
  },
  noti: {
    width: "100%",
    height: 130,
    padding: 20,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 2,
  },
});
