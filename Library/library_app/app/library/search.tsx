import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Logo from "@/components/library/Logo";
import { router } from "expo-router";
import { List } from "postcss/lib/list";
import BookCard from "@/components/library/BookCard";
import { client } from "@/utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/components/library/LoadingScreen";
import BookFilter from "@/components/library/BookFilter";
import LoanFilter from "@/components/library/LoanFilter";

const SearchComponent = () => {
  const [list, setList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getBooks = async () => {
  //     setIsLoading(true);
  //     const limit = 5;
  //     const page = 5;
  //     const { data } = await client.get(`/loans?page=${page}&limit=${limit}`);
  //     setList(data.data);
  //     setIsLoading(false);
  //   };
  //   getBooks();
  // }, []);
  if (isloading) return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LoanFilter applyFilters={() => {}} />
        {isloading ? <Text>"Loading..."</Text> : <Text>Search</Text>}
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
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
