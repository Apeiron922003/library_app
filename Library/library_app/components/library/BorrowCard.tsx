import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { Buffer } from "buffer";
import { Alert, TouchableOpacity, View } from "react-native";
import { Loan } from "@/redux/slices/loanSlice";
import { router } from "expo-router";
// @ts-ignore
function BorrowCard(props) {
  const loan = props.loan as Loan;
  const detailBook = () => {
    router.push({
      pathname: `/library/detailBook`,
      params: { id: loan.book_id },
    });
  };
  const returnBook = () => {
    console.log("Return");

    Alert.alert("Return Book", `You want to return ${loan.Book.title}?`, [
      { text: "Cancel", onPress: () => {} },
      { text: "Ok", onPress() {} },
    ]);
  };
  return (
    <Card style={{ marginBottom: 20, padding: 10, width: "100%" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity onPress={detailBook}>
          <Card.Cover
            source={{
              uri: `data:image/jpeg;base64,${Buffer.from(
                loan?.Book?.cover! ? loan?.Book?.cover! : "",
                "binary"
              ).toString("base64")}`,
            }}
            style={{ flexGrow: 0, width: 130 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <Card.Title
            title={loan?.Book?.title}
            subtitle={loan?.Book?.author}
            titleStyle={{ fontWeight: 800 }}
            subtitleStyle={{ fontStyle: "italic" }}
          />
          <Card.Content>
            <Text style={{ color: "green" }}>{loan.created_at}</Text>
            <Text style={{ color: "red" }}>{loan.due_at}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={returnBook}>Return</Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );
}

export default BorrowCard;
