import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// @ts-ignore
function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ ...styles.button }}
      onPress={() => {
        if (router.canGoBack()) router.back();
      }}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
});

export default BackButton;
