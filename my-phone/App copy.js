import { StyleSheet, Text, View, Image, FlatList } from "react-native";

const data = [
  { id: 1, time: "7:04", buoi: "pm", address: "Palo Alto", temp: 62 },
  { id: 2, time: "7:04", buoi: "pm", address: "San Francisco", temp: 60 },
  { id: 3, time: "7:04", buoi: "pm", address: "San Jose", temp: 66 },
  { id: 4, time: "7:04", buoi: "pm", address: "Los Angeles", temp: 66 },
  { id: 5, time: "3:04", buoi: "am", address: "London", temp: 50 },
];

const Item = ({ data }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 3,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontWeight: 500 }}>
          {data.time} {data.buoi}
        </Text>
        <Text style={{ fontSize: 28 }}>{data.address}</Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          src={
            data.buoi == "pm"
              ? "https://static.vecteezy.com/system/resources/previews/000/550/828/original/sun-icon-vector.jpg"
              : "https://static.vecteezy.com/system/resources/previews/002/567/395/original/moon-night-with-cloud-line-style-icon-free-vector.jpg"
          }
        />
        <Text style={{ fontSize: 40 }}> {data.temp}°</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={{ backgroundColor: "#f0f0f0", height: "100%" }}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{
            uri: "https://vectorified.com/images/white-sun-icon-11.png",
          }}
        ></Image>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <View style={{ padding: 15 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    backgroundColor: "#0686e4",
    height: 75,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  headerImage: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 25,
    color: "white",
  },
});
