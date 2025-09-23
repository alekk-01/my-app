import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  
  const router = useRouter()
  return (

    <View style={styles.body}>

      <View style={styles.column}>
        <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
          <Image
            source={require("./attractive-young-man-standing-all-isolated-on-white-background-BX7MEE.jpg")}
            style={{ width: 200, height: 600 }}
          />
          <Image
            source={require("./OIP (1).webp")}
            style={styles.overlayImage}
          />
      </View>

      <View style={styles.column}>
          <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => console.log("Hello World clicked!")}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => router.push("/app")}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>   
      </View> 


     </View>
  );
}

export default Home

const styles = StyleSheet.create({
  body: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        flexDirection: "row"

  },
  container: {
        backgroundColor: "red"

  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    padding: 20,
    backgroundColor: "Black",

  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  overlayImage: {
    position: "absolute",
    top: 250,
    right: -20,

  }
})
