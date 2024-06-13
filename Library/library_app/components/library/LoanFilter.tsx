import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Portal,
  Dialog,
  TextInput,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
//@ts-ignore
const LoanFilter = ({ applyFilters }) => {
  const [visible, setVisible] = useState(false);
  const [filterReturned, setFilterReturned] = useState(false);
  const [filterNotReturned, setFilterNotReturned] = useState(false);
  const [sortByBorrowDate, setSortByBorrowDate] = useState(false);
  const [sortByReturnDate, setSortByReturnDate] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleFilter = () => {
    // Xử lý logic lọc ở đây và gọi hàm applyFilters với các tham số cần thiết
    applyFilters({
      filterReturned,
      filterNotReturned,
      sortByBorrowDate,
      sortByReturnDate,
      startDate,
      endDate,
    });
    setVisible(false); // Ẩn dialog khi áp dụng bộ lọc
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Loan Filter</Dialog.Title>
        <Dialog.Content>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Filter by returned:</Text>
            <IconButton
              icon={
                filterReturned ? "checkbox-marked" : "checkbox-blank-outline"
              }
              onPress={() => setFilterReturned(!filterReturned)}
            />
            <IconButton
              icon={
                filterNotReturned ? "checkbox-marked" : "checkbox-blank-outline"
              }
              onPress={() => setFilterNotReturned(!filterNotReturned)}
            />
          </View>
          <Divider />
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <IconButton
              icon={
                sortByBorrowDate ? "checkbox-marked" : "checkbox-blank-outline"
              }
              onPress={() => setSortByBorrowDate(!sortByBorrowDate)}
            />
            <IconButton
              icon={
                sortByReturnDate ? "checkbox-marked" : "checkbox-blank-outline"
              }
              onPress={() => setSortByReturnDate(!sortByReturnDate)}
            />
          </View>
          <Divider />
          <Text>Start Date:</Text>
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner" // Chuyển display thành "spinner"
            onChange={(event, selectedDate) => setStartDate(selectedDate!)}
          />
          <Divider />
          <Text>End Date:</Text>
          <DateTimePicker
            value={endDate}
            mode="date"
            display="spinner" // Chuyển display thành "spinner"
            onChange={(event, selectedDate) => setEndDate(selectedDate!)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleFilter}>Apply Filter</Button>
        </Dialog.Actions>
      </Dialog>
      <IconButton
        icon="filter"
        onPress={() => setVisible(true)}
        style={styles.filterButton}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  filterLabel: {
    marginRight: 10,
  },
  filterButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default LoanFilter;
