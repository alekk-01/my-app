import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


//GERA TAGS FYRIR BUXUR OG SKÓ, Búa til index fyrir Shirts svo það sé possible að flippa í gegnum það

const Home = () => {

  const [shirts, setShirts] = useState<string[]>([]);
  const [hats, setHats] = useState<string[]>([]);
  const [pants, setPants] = useState<string[]>([]);
  const [shoes, setShoes] = useState<string[]>([]);


  const [shirtindex, setShirtIndex] = useState(0);
  const [hatindex, setHatIndex] = useState(0);
  const [pantsindex, setPantsIndex] = useState(0);
  const [shoeindex, setShoesIndex] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const loadAll = async () => {
      try {
        const storedHats = await AsyncStorage.getItem("Gallery_Hats");
        if (storedHats) {
           setHats(JSON.parse(storedHats));
        }
        const storedShirts = await AsyncStorage.getItem("Gallery_Shirts")
        if (storedShirts) {
          setShirts(JSON.parse(storedShirts));
        }
        const storedPants = await AsyncStorage.getItem("Gallery_Pants")
        if (storedPants) {
          setPants(JSON.parse(storedPants));
        }
        const storedShoes = await AsyncStorage.getItem("Gallery_Shoes")
        if (storedShoes) {
          setShoes(JSON.parse(storedShoes));
        }
      } catch(e) {
        Alert.alert("alert weeewoooweeewooo")
      }
    };
    loadAll();
  },[]);

  const nextHat = () => {
    if (hats.length > 0) {
      setHatIndex((prev) => (prev + 1) % hats.length)
    }
  };

  const prevhat = () => {
    if(hats.length > 0) {
      setHatIndex((prev) => (prev - 1 + hats.length) % hats.length)
    }
  }
    const nextShirt = () => {
    if (shirts.length > 0) {
      setShirtIndex((prev) => (prev + 1) % shirts.length)
    }
  };

  const prevShirt = () => {
    if(shirts.length > 0) {
      setShirtIndex((prev) => (prev - 1 + shirts.length) % shirts.length)
    }
  }
  const nextPants = () => {
    if (pants.length > 0) {
      setPantsIndex((prev) => (prev + 1) % pants.length)
    }
  }

  const prevPants = () => {
    if(pants.length > 0) {
      setPantsIndex((prev) => (prev - 1 + pants.length) % pants.length)
    }
  }
  const nextShoes = () => {
    if (shoes.length > 0) {
      setShoesIndex((prev) => (prev + 1) % shoes.length)
    }
  }

  const prevShoes = () => {
    if(pants.length > 0) {
      setShoesIndex((prev) => (prev - 1 + shoes.length) % shoes.length)
    }
  }
  return (

    <View style={styles.body}>

      <View style={styles.column}>
        <TouchableOpacity onPress={prevhat}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevShirt}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevPants}>
            <Text style={styles.link}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevShoes}>
              <Text style={styles.link}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
          <Image
            source={require("./attractive-young-man-standing-all-isolated-on-white-background-BX7MEE.jpg")}
            style={{ width: 200, height: 600 }}
          />
          {hats.length > 0 && (
          <Image
            source={{uri: hats[hatindex]}}
            style={styles.overlayImageTop}
          />
          )}
          {shirts.length > 0 && (
          <Image
            source={{uri: shirts[shirtindex]}}
            style={styles.overlayImageMid}
          />
          )}
          {pants.length > 0 && (
          <Image
            source={{uri: pants[pantsindex]}}
            style={styles.overlayImageBot}
          />
          )}
          {shoes.length > 0 && (
          <Image
            source={{uri: shoes[shoeindex]}}
            style={styles.overlayImageSupp}
          />
          )}

      </View>

      <View style={styles.column}>
          <TouchableOpacity onPress={nextHat}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={nextShirt}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={nextPants}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextShoes}>
              <Text style={styles.link}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/app")}>
              <Text style={styles.link}>APP</Text>
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
  overlayImageTop: {
    position: "absolute",
    top: 20,
    right: 62,
    height: 50,
    width: 100,
  },
  overlayImageMid: {
    position: "absolute",
    top: 120,
    right: 50,
    height: 150,
    width: 120,
  },
    overlayImageBot: {
    position: "absolute",
    top: 250,
    right: 62,
    height: 250,
    width: 100,
  },
    overlayImageSupp: {
    position: "absolute",
    top: 500,
    right: 45,
    height: 50,
    width: 130,
  }
})
