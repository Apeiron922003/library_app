import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Buffer } from "buffer";
import { View, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

// @ts-ignore
function BookCard({ book, onPressDetails }) {
  const detailBook = () => {
    router.push({
      pathname: `/library/detailBook`,
      params: { id: book.id },
    });
  };
  return (
    <Card style={{ marginBottom: 20, padding: 10, width: "100%" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity onPress={detailBook}>
          <Card.Cover
            source={{
              uri: `data:image/jpeg;base64,${Buffer.from(
                book.cover,
                "binary"
              ).toString("base64")}`,
            }}
            style={{ flexGrow: 0, width: 130 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <Card.Title
            title={book.title}
            subtitle={book.author}
            titleStyle={{ fontWeight: 800 }}
            subtitleStyle={{ fontStyle: "italic" }}
          />
          <Card.Content>
            <Text>{book.publisher}</Text>
            <Text>{book.release_year}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onPressDetails}>Detail</Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );
}

export default BookCard;
