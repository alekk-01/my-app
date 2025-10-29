import AsyncStorage from "@react-native-async-storage/async-storage"; //image save dót
import * as ImagePicker from "expo-image-picker"; //velja myndir
import * as React from "react"; //react in general
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; //allt extra sem ég bæti við

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
      <TouchableOpacity onPress={() => pickImage("hat")} >
        <Text>press me (hats)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage("shirt")} >
        <Text>press me (shirt)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage("pants")} >
        <Text>press me (pants)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage("shoe")} >
        <Text>press me (shoes)</Text>
      </TouchableOpacity>
      
    <FlatList
      data={shirts} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} /> 
      )}
      numColumns={2}  
    />
<Text>----------------------------------------------------</Text>
    <FlatList
      data={hats} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} /> 
      )}
      numColumns={2}  
    />
<Text>----------------------------------------------------</Text>

    <FlatList
      data={pants} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} /> 
      )}
      numColumns={2}  
    />
<Text>----------------------------------------------------</Text>

        <FlatList
      data={shoes} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} /> 
      )}
      numColumns={2}  
    />


    
    <Button title="Clear Gallery" onPress={clearGallery} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 10,
  },
});