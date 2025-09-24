import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
  



const Home = () => {
  const Myndir = [
  require("./OIP__1_-removebg-preview.png"),
  require("./OIP (1).webp"),
  require("./attractive-young-man-standing-all-isolated-on-white-background-BX7MEE.jpg")
]
  const [index, setIndex] = useState(0);
  

  const router = useRouter()
  return (

    <View style={styles.body}>

      <View style={styles.column}>
        <TouchableOpacity onPress={() => setIndex((index - 1) % Myndir.length)}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIndex((index - 1) % Myndir.length)}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIndex((index - 1) % Myndir.length)}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
          <Image
            source={Myndir[index]}
            style={{ width: 200, height: 600 }}
          />
          <Image
            source={Myndir[index]}
            style={styles.overlayImage}
          />
      </View>

      <View style={styles.column}>
          <TouchableOpacity onPress={() => setIndex((index + 1) % Myndir.length)}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setIndex((index + 1) % Myndir.length)}>
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
    top: 183,
    right: -15,
    height: 322,
  }
})
