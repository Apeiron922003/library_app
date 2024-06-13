import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Logo from "@/components/library/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Link,
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import BookCard from "@/components/library/BookCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getBooks } from "@/redux/slices/bookSlice";
import { toast } from "@/utils/toast";
import { ScrollView } from "react-native-virtualized-view";
import LoadingScreen from "@/components/library/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BooksComponent = () => {
  const { user } = useLocalSearchParams();
  const { books, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  useFocusEffect(
    useCallback(() => {
      if (books?.length == 0 || !books) dispatch(getBooks());
    }, [])
  );

  if (status === "pending") {
    return <LoadingScreen />;
  }
  if (status === "reject") {
    toast.error("Đã có lỗi xảy ra!");
    return <Redirect href={"/auth/login"} />;
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.innerContainer}>
          {status === "fullfill" && (
            <>
              {message && <Text style={{ color: "red" }}>{message}</Text>}
              <FlatList
                style={{ width: "100%" }}
                data={books}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => {
                  return (
                    <BookCard
                      book={item}
                      onPressDetails={() => {
                        router.push({
                          pathname: `/library/detailBook`,
                          params: { id: item.id },
                        });
                      }}
                    />
                  );
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BooksComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
