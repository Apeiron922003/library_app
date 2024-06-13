import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, Checkbox, Button } from "react-native-paper";

export default function BookFilter() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [fictionChecked, setFictionChecked] = React.useState(false);
  const [nonFictionChecked, setNonFictionChecked] = React.useState(false);

  const onChangeFiction = () => {
    setFictionChecked(!fictionChecked);
  };

  const onChangeNonFiction = () => {
    setNonFictionChecked(!nonFictionChecked);
  };

  const applyFilters = () => {
    // Apply filters based on searchQuery, fictionChecked, nonFictionChecked
    // This function can be replaced with your actual filtering logic
    console.log("Search Query:", searchQuery);
    console.log("Fiction Checked:", fictionChecked);
    console.log("Non-Fiction Checked:", nonFictionChecked);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <View style={styles.filterSection}>
        <Checkbox.Item
          label="Fiction"
          status={fictionChecked ? "checked" : "unchecked"}
          onPress={onChangeFiction}
        />
        <Checkbox.Item
          label="Non-Fiction"
          status={nonFictionChecked ? "checked" : "unchecked"}
          onPress={onChangeNonFiction}
        />
      </View>
      <Button mode="contained" onPress={applyFilters}>
        Apply Filters
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
});
