import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import studentSlice from "./studentSlice";
const { update } = studentSlice.actions;

export const StudentDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const item = route.params.item;
  const [id] = useState(item.id);
  const [name, setName] = useState(item.name);
  const [year, setYear] = useState(item.year);
  return (
    <View style={styles.container}>
      <Text>Chi tiết sinh viên {id}</Text>
      <View>
        <TextInput
          style={styles.textInput}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          style={styles.textInput}
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <Button
          title="Save"
          onPress={() => {
            dispatch(update({ id, name, year }));
            navigation.navigate("Home");
          }}
        />
      </View>
    </View>
  );
};
export const Student = ({ navigation }) => {
  const student = useSelector((state) => state.student);
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 50 }}>Danh sách sinh viên</Text>
      <FlatList
        data={student}
        renderItem={({ item }) => (
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Detail", { item });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                width: 300,
              }}
            >
              <Text style={{ width: 200 }}>Tên: {item.name}</Text>
              <Text>Năm: {item.year}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "yellow",
    marginVertical: 10,
  },
  textInput: {
    margin: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
    width: 210,
  },
});
