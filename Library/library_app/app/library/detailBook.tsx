import { client } from "@/utils/client";
import {
  Link,
  Navigator,
  Redirect,
  router,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { Buffer } from "buffer";
import { toast } from "@/utils/toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import bookSlice, { Book, getBook } from "@/redux/slices/bookSlice";
import BorrowModal from "@/components/library/BorrowModal";
import { Button } from "react-native-paper";
import LoadingScreen from "@/components/library/LoadingScreen";
import { useFocusEffect } from "@react-navigation/native";
function BookDetailsScreen() {
  let { id } = useLocalSearchParams();
  const { books, detail, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<Book>({ cover: "" } as Book);
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const detail_cache = books?.find((book) => book.id == +id!);
      if (detail_cache) setBook(detail_cache);
      else {
        const get = async () => {
          await dispatch(getBook(+id!));
          setBook(detail!);
        };
        get();
      }
    }, [id])
  );
  if (status === "pending") return <LoadingScreen />;
  if (status === "reject") {
    toast.error("Something was wrong!");
    return <Redirect href={"/library"} />;
  }
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {status === "fullfill" && book && (
            <>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${Buffer.from(
                    book?.cover,
                    "binary"
                  ).toString("base64")}`,
                }}
                style={styles.image}
              />

              <View style={styles.infomation}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>
                  <Text style={{ fontWeight: 800 }}>Author:</Text> {book.author}
                </Text>
                <Text style={styles.publisher}>
                  <Text style={{ fontWeight: 800 }}>Publisher:</Text>{" "}
                  {book.publisher}
                </Text>
                <Text style={styles.year}>
                  <Text style={{ fontWeight: 800 }}>Release year:</Text>{" "}
                  {book.release_year}
                </Text>
                <Text style={styles.summary}>
                  <Text style={{ fontWeight: 800 }}>Description:</Text>{" "}
                  {book.description}
                </Text>
                <Text style={styles.copies}>
                  <Text style={{ fontWeight: 800 }}>Copies:</Text>{" "}
                  {book.number_of_copies}
                </Text>
                <Text style={styles.availableCopies}>
                  <Text style={{ fontWeight: 800 }}>Avaiable Copies:</Text>{" "}
                  {book.copies_available}
                </Text>
              </View>
              <View>
                <Button
                  onPress={() => {
                    setShowBorrowModal(true);
                  }}
                >
                  Borrow
                </Button>
              </View>
              {showBorrowModal && (
                <BorrowModal
                  isShow={showBorrowModal}
                  setShow={setShowBorrowModal}
                  id={id}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: "center",
  },
  publisher: {
    fontSize: 18,
    marginVertical: 2,
  },
  year: {
    fontSize: 18,
    marginVertical: 2,
  },
  summary: {
    fontSize: 16,
    marginVertical: 10,
  },
  copies: {
    fontSize: 16,
    marginVertical: 2,
  },
  availableCopies: {
    fontSize: 16,
    marginVertical: 2,
  },
  infomation: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
});

export default BookDetailsScreen;
