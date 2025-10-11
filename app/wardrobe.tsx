import { StyleSheet, View } from "react-native";
import Images from "./app";

const Home = () => {
  return (
    <View style={styles.body}>
        <Images />
    </View>
  );
}

export default Home

const styles = StyleSheet.create({

  body: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flex: 1,
        alignContent: "center",
        flexDirection: "row"

  },
  container: {
        justifyContent: "flex-start",
        direction: "ltr",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  header: {
    backgroundColor: "light-blue"
  }
})
