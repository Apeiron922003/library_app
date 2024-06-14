import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFocusEffect, usePathname } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Loan, fetchLoans } from "@/redux/slices/loanSlice";
import LoadingScreen from "@/components/library/LoadingScreen";
import BorrowCard from "@/components/library/BorrowCard";
import LoanFilter from "@/components/library/LoanFilter";
import moment from "moment";
interface Filter {
  returned: boolean | null;
  select: "borrowDate" | "dueDate";
  order: "newest" | "oldest";
}
const BorrowedComponent = () => {
  const path = usePathname();
  const { loans, status } = useAppSelector((state) => state.loan);
  const [searchResults, setSearchResults] = useState<Loan[]>(
    loans ? loans : []
  );
  const dispatch = useAppDispatch();
  useFocusEffect(
    useCallback(() => {
      const get = async () => {
        await dispatch(fetchLoans());
      };
      get();
    }, [dispatch])
  );
  useEffect(() => {
    setSearchResults(loans);
    applyFilter({ returned: false, select: "dueDate", order: "oldest" });
  }, [loans]);

  const applyFilter = (filter: Filter) => {
    let filteredData = loans ? [...loans] : [];
    // Lọc theo trạng thái returned
    if (filter.returned !== null) {
      if (filter.returned) {
        filteredData = filteredData.filter((loan) => loan.return_at);
      } else {
        filteredData = filteredData.filter((loan) => !loan.return_at);
      }
    }
    // Sắp xếp theo select và order
    const getDate = (loan: Loan, dateType: "created_at" | "due_at") =>
      moment(loan[dateType], "HH:MM DD:MM:YYYY");
    filteredData.sort((a, b) => {
      if (filter.select === "borrowDate") {
        return filter.order === "newest"
          ? getDate(b, "created_at").diff(getDate(a, "created_at"))
          : getDate(a, "created_at").diff(getDate(b, "created_at"));
      } else if (filter.select === "dueDate") {
        return filter.order === "newest"
          ? getDate(b, "due_at").diff(getDate(a, "due_at"))
          : getDate(a, "due_at").diff(getDate(b, "due_at"));
      }
      return 0;
    });
    setSearchResults(filteredData);
  };
  if (status === "pending") return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {path === "/library/borrowed" && (
          <LoanFilter applyFilters={applyFilter} />
        )}
        {!loans?.length && (
          <Text style={{ textAlign: "center" }}>No Borrowed Book</Text>
        )}
        {status === "fullfill" && loans && (
          <ScrollView>
            <FlatList
              style={{ width: "100%" }}
              data={searchResults}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => {
                return <BorrowCard loan={item} />;
              }}
            />
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
});
