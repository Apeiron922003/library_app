//@ts-nocheck
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button, Card, Text, Modal, Portal } from "react-native-paper";
import { addLoan } from "@/redux/slices/loanSlice";
import { useAppDispatch } from "@/hooks/useRedux";

const BorrowModal = ({ id, isShow, setShow }) => {
  const [borrowDays, setBorrowDays] = useState("");
  const [dueDate, setDueDate] = useState("...");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleBorrow = async () => {
    await dispatch(addLoan({ book_id: +id, due_time: +borrowDays }));
    setShow(false);
  };

  useEffect(() => {
    if (isNaN(+borrowDays)) setMessage("Borrow days must be a number!");
    else setMessage("");
  }, [borrowDays]);

  if (!isShow) return null;

  return (
    <Portal>
      <Modal
        visible={isShow}
        onDismiss={() => {
          setShow(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Duration:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={borrowDays}
              onChangeText={(text) => {
                setBorrowDays(text);
                const today = new Date();
                const due = new Date(today);
                due.setDate(today.getDate() + +text);
                setDueDate(due.toDateString());
              }}
              placeholder="How many days?"
            />
            {message && <Text style={{ color: "red" }}>{message}</Text>}
            <Text style={{ width: 300 }}>Due date: {dueDate}</Text>
            <View style={styles.buttonContainer}>
              <Card.Actions>
                <Button
                  onPress={() => {
                    setShow(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleBorrow}
                  style={{ opacity: message ? 0.5 : 1 }}
                  disabled={!!message}
                >
                  Confirm
                </Button>
              </Card.Actions>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 5,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BorrowModal;
