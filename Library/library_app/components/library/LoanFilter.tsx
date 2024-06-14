import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Portal,
  Dialog,
  TextInput,
  Checkbox,
  ToggleButton,
  Menu,
  RadioButton,
  Switch,
} from "react-native-paper";
//@ts-ignore
const LoanFilter = ({ applyFilters }) => {
  const [visible, setVisible] = useState(false);
  const [returned, setReturned] = useState(false);
  const [startDate, setStartDate] = useState<"newest" | "oldest" | null>(null);
  const [endDate, setEndDate] = useState<"newest" | "oldest" | null>("oldest");
  const [select, setSelection] = useState<"borrowDate" | "dueDate">("dueDate");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const handleFilter = () => {
    const filter = {
      returned: !isSwitchOn ? null : returned,
      select,
      order: select == "borrowDate" ? startDate : endDate,
    };
    applyFilters(filter);
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Content>
          <View style={styles.filterRow}>
            <Checkbox
              status={isSwitchOn ? "checked" : "unchecked"}
              onPress={() => {
                setIsSwitchOn(!isSwitchOn);
              }}
            />
            <Text style={styles.filterLabel}>Returned</Text>
            <Switch value={returned} onValueChange={setReturned} />
          </View>
          <Divider />
          <View style={styles.filterRow}>
            <RadioButton
              value="startDate"
              status={select == "borrowDate" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("borrowDate");
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text style={styles.filterLabel}>Borrow Date</Text>
              <ToggleButton.Group
                value={startDate}
                onValueChange={(value: "newest" | "oldest") => {
                  setEndDate(null);
                  setStartDate(value);
                }}
              >
                <ToggleButton icon="arrow-up" value="newest" />
                <ToggleButton icon="arrow-down" value="oldest" />
              </ToggleButton.Group>
            </View>
          </View>
          <View style={styles.filterRow}>
            <RadioButton
              value="endDate"
              status={select == "dueDate" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("dueDate");
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text style={styles.filterLabel}>Due Date</Text>
              <ToggleButton.Group
                value={endDate}
                onValueChange={(value: "newest" | "oldest") => {
                  setStartDate(null);
                  setEndDate(value);
                }}
              >
                <ToggleButton icon="arrow-up" value="newest" />

                <ToggleButton icon="arrow-down" value="oldest" />
              </ToggleButton.Group>
            </View>
          </View>
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
    gap: 20,
  },
  filterLabel: {
    marginRight: 10,
    width: 80,
  },
  filterButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
});

export default LoanFilter;
