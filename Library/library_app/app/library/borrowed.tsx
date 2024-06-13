import React, { Component, useCallback, useEffect, useState } from "react";
import { Link, Redirect, router, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Logo from "@/components/library/Logo";
import { List } from "postcss/lib/list";
import BookCard from "@/components/library/BookCard";
import { client } from "@/utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toast } from "@/utils/toast";
import { fetchLoans } from "@/redux/slices/loanSlice";
import LoadingScreen from "@/components/library/LoadingScreen";
import BorrowCard from "@/components/library/BorrowCard";
import BookFilter from "@/components/library/BookFilter";
import LoanFilter from "@/components/library/LoanFilter";

const BorrowedComponent = () => {
  const { loans, status } = useAppSelector((state) => state.loan);
  const dispatch = useAppDispatch();
  useFocusEffect(
    useCallback(() => {
      const getLoans = async () => {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          if (loans?.length == 0 || !loans) dispatch(fetchLoans());
        } else {
          toast.error("Login please!");
        }
      };
      getLoans();
    }, [])
  );
  if (status === "pending") return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Chèn LoanFilter vào đây */}
        {!loans && <Text>No Borrowed Book</Text>}
        {status === "fullfill" && loans && (
          <ScrollView>
            {loans.map((loan) => (
              <BorrowCard key={loan.id} loan={loan} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default BorrowedComponent;

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
  row: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#f1f8ff",
    borderBottomWidth: 1,
    borderBottomColor: "#C1C0B9",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#C1C0B9",
  },
  headerCell: { backgroundColor: "#f6f8fa", fontWeight: "bold" },
});
