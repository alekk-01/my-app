import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



const Home = () => {
  const Myndir = [
  require("./OIP__1_-removebg-preview.png"),
  require("./OIP (7).webp")
]
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const loadImages = async () => {
      try {
        const stored = await AsyncStorage.getItem("Gallery");
        if (stored) {
           setImages(JSON.parse(stored));
        }
      } catch(e) {
        Alert.alert("alert weeewoooweeewooo")
      }
    };
    loadImages();
  },[]);

  const nextmynd = () => {
    if (images.length > 0) {
      setIndex((prev) => (prev + 1) % images.length)
    }
  };

  const fyrrimynd = () => {
    if(images.length > 0) {
      setIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }
  return (

    <View style={styles.body}>

      <View style={styles.column}>
        <TouchableOpacity onPress={fyrrimynd}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={fyrrimynd}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={fyrrimynd}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
          <Image
            source={require("./attractive-young-man-standing-all-isolated-on-white-background-BX7MEE.jpg")}
            style={{ width: 200, height: 600 }}
          />
          {images.length > 0 && (
          <Image
            source={{uri: images[index]}}
            style={styles.overlayImage}
          />
          )}
    
      </View>

      <View style={styles.column}>
          <TouchableOpacity onPress={nextmynd}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push("/wardrobe")}>
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
    top: 230,
    right: 62,
    height: 290,
    width: 100,
  }
})
