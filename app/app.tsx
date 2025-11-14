import AsyncStorage from "@react-native-async-storage/async-storage"; //image save dót
import * as ImagePicker from "expo-image-picker"; //velja myndir
import * as React from "react"; //react in general
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"; //allt extra sem ég bæti við

export default function Images() {
  const [hats, setHats] = React.useState<string[]>([]);
  const [shirts, setShirts] = React.useState<string[]>([]);
  const [pants, setPants] = React.useState<string[]>([]);
  const [shoes, setShoes] = React.useState<string[]>([]);

  //image saver dót
  React.useEffect(() => {
    const loadAll = async () => {
        try{
            const storedHats = await AsyncStorage.getItem("Gallery_Hats");
            const storedShirt= await AsyncStorage.getItem("Gallery_Shirts");
            const storedPants= await AsyncStorage.getItem("Gallery_Pants");
            const storedShoes= await AsyncStorage.getItem("Gallery_Shoes");

            if (storedHats){
                setHats(JSON.parse(storedHats));
            }
            if (storedShirt){
                setShirts(JSON.parse(storedShirt));
            }
            if (storedPants){
                setPants(JSON.parse(storedPants));
            }
            if (storedShoes){
                setShoes(JSON.parse(storedShoes));
            }
    
         } catch (e) {
        console.log("Error loading gallery:", e);
         }
      };
    loadAll();
  }, []);

  //velja image dót
  const pickImage = async (category: string) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //fá leyfi 
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    //skila tilbaka image og vista því
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      switch (category) {
        case "hat":
          const newHats = [...hats,uri]
          setHats(newHats);
          await AsyncStorage.setItem("Gallery_Hats", JSON.stringify(newHats));
          break;
        case "shirt":
          const newShirt = [...shirts,uri]
          setShirts(newShirt);
          await AsyncStorage.setItem("Gallery_Shirts", JSON.stringify(newShirt));
          break;
        case "pants":
          const newPants = [...pants,uri]
          setPants(newPants);
          await AsyncStorage.setItem("Gallery_Pants", JSON.stringify(newPants));
          break;
        case "shoe":
          const newShoes = [...shoes,uri]
          setShoes(newShoes);
          await AsyncStorage.setItem("Gallery_Shoes", JSON.stringify(newShoes));
          break;
      }
    }
  };
  const clearGallery = async () => {
    await AsyncStorage.removeItem("Gallery_Hats");
    await AsyncStorage.removeItem("Gallery_Shirts");
    await AsyncStorage.removeItem("Gallery_Pants");
    await AsyncStorage.removeItem("Gallery_Shoes");
    setHats([])
    setShirts([])
    setPants([])
    setShoes([])
  }
  
  //ef ekki þá birta val glugga
  return (
  <View>
    <View>
      <Text style={styles.top}>Bæta við fötum</Text>
    </View>
    <View style={styles.container}>
        <TouchableOpacity onPress={() => pickImage("hat")} >
          <Text style={styles.button}>Hats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("shirt")} >
          <Text style={styles.button}>Shirt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("pants")} >
          <Text style={styles.button}>Pants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage("shoe")} >
          <Text style={styles.button}>Shoes</Text>
        </TouchableOpacity>
      </View>
    <ScrollView contentContainerStyle={styles.Page}>
          <View style={styles.containerImages}>

      <Text>--------------------------HATS--------------------------</Text>
          <View style={styles.imageGrid}>
            {hats.map((item, index) => (
      <Image key={index} source={{ uri: item }} style={styles.image} />
    ))}
  </View>
      <Text>--------------------------SHIRTS--------------------------</Text>
          <View style={styles.imageGrid}>
            {shirts.map((item, index) => (
      <Image key={index} source={{ uri: item }} style={styles.image} />
    ))}
  </View>
      <Text>-------------------------PANTS--------------------------</Text>

          <View style={styles.imageGrid}>
            {pants.map((item, index) => (
      <Image key={index} source={{ uri: item }} style={styles.image} />
    ))}
  </View>
      <Text>-------------------------SHOES---------------------------</Text>

              <View style={styles.imageGrid}>
            {shoes.map((item, index) => (
      <Image key={index} source={{ uri: item }} style={styles.image} />
    ))}
  </View>


          
          <Button title="Clear Gallery" onPress={clearGallery} />
      </View>
    </ScrollView>
  </View>

  )
}

const styles = StyleSheet.create({
  Page: {
  },
  top:{
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  container: {
    backgroundColor: "white",
    height: 75,
    position: "absolute",
    top: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10 ,
    zIndex: 10,
    justifyContent: "center",
    
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 10,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: "center",
    backgroundColor: "blue",
    color: "white"
  },      
     
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  containerImages: {
    marginTop: 100
  },
});