import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [result, setResult] = useState(null);
  const [mess, setMess] = useState(" ");
  const sum = () => {
    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x,
        y,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) throw Error(data.error);
        setMess("Tổng là:");
        setResult(data.data.result);
      })
      .catch((err) => {
        setMess(err.message);
        setResult("Lỗi");
      });
  };
  const save = () => {
    AsyncStorage.setItem("calculator", JSON.stringify({ x, y, result }));
  };
  useEffect(() => {
    const getData = async () => {
      const storage = await AsyncStorage.getItem("calculator");
      if (storage) {
        const { x, y, result } = JSON.parse(storage);
        setX(x);
        setY(y);
        setResult(result);
        setMess("Phép tính gần đây");
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Nhập 2 số bất kỳ</Text>
      <View>
        <TextInput
          style={styles.textInput}
          onChange={(e) => {
            setX(e.target.value);
          }}
          value={x ? x : ""}
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          onChange={(e) => {
            setY(e.target.value);
          }}
          value={y ? y : ""}
        />
      </View>
      <View style={{ margin: 3, width: 100 }}>
        <Button
          title="Tính tổng"
          onPress={() => {
            sum();
          }}
        />
      </View>
      <View style={{ margin: 3, width: 100 }}>
        <Button
          title="Lưu lại"
          onPress={() => {
            save();
          }}
        />
      </View>
      <View>
        <Text style={{ margin: 5, width: 210, textAlign: "center" }}>
          {mess}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Kết quả"
          value={result ? result : ""}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    margin: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
    width: 210,
  },
});
export default App;
