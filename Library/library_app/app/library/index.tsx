import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Link,
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import BookCard from "@/components/library/BookCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Book, getBooks } from "@/redux/slices/bookSlice";
import { toast } from "@/utils/toast";
import { ScrollView } from "react-native-virtualized-view";
import LoadingScreen from "@/components/library/LoadingScreen";
import { Searchbar } from "react-native-paper";
import { debounce } from "lodash";
const BooksComponent = () => {
  const firstLoad = useRef(true);
  const { books, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[] | null>(null);
  // useFocusEffect(
  //   useCallback(() => {
  //     const get = async () => {
  //       if (firstLoad.current) {
  //         firstLoad.current = false;
  //         await dispatch(getBooks());
  //         setSearchResults(books!);
  //       }
  //       setSearchResults(books!);
  //     };
  //     get();
  //   }, [books, searchResults])
  // );
  useEffect(() => {
    const fetchBooks = async () => {
      await dispatch(getBooks());
    };
    fetchBooks();
  }, [dispatch]);
  useEffect(() => {
    if (status === "fullfill" && books) {
      setSearchResults(books);
    }
  }, [books, status]);

  const debouncedSearchBooks = debounce((text: any) => {
    const lowerCaseQuery = text.toLowerCase();
    const filteredBooks = books!.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.publisher.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchResults(filteredBooks);
  }, 300);
  const handleSearch = (text: any) => {
    setSearchQuery(text);
    debouncedSearchBooks(text);
  };
  if (status === "pending") {
    return <LoadingScreen />;
  }
  if (status === "reject") {
    toast.error("Please login to continue.");
    return <Redirect href={"/auth/login"} />;
  }
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        style={{ width: "100%", margin: 10 }}
      />

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.innerContainer}>
          {status === "fullfill" && (
            <>
              {searchResults?.length == 0 ? (
                <Text>No book matching.</Text>
              ) : (
                <FlatList
                  style={{ width: "100%" }}
                  data={searchResults}
                  keyExtractor={(item: any) => item.id}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                  renderItem={({ item }) => {
                    return <BookCard book={item} />;
                  }}
                />
              )}
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
    backgroundColor: "#ffffff",
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
});
