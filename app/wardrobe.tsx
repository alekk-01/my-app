import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.body}>
        <div style={styles.header}>

            <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
                <Text style={styles.link}>Button</Text>
            </TouchableOpacity>
        </div>

      <a href="/">Hello World</a>
      <div>
        <Text></Text>
      </div>
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
        flexDirection: "column"

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
