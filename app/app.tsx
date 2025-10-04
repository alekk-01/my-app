import AsyncStorage from "@react-native-async-storage/async-storage"; //image save dót
import * as ImagePicker from "expo-image-picker"; //velja myndir
import * as React from "react"; //react in general
import { Button, FlatList, Image, StyleSheet, View } from "react-native"; //allt extra sem ég bæti við

export default function Gallery() {
  const [Images, setImage] = React.useState<string[]>([]);

  //image saver dót
  React.useEffect(() => {
    const loadImage = async () => {
        try{
            const storedUri = await AsyncStorage.getItem("Gallery");

            if (storedUri){
                setImage(JSON.parse(storedUri));
            }
    
         } catch (e) {
        console.log("Error loading gallery:", e);
         }
      };
    loadImage();
  }, []);

  //velja image dót
  const pickImage = async () => {
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
      const uri = result.assets[0].uri
      const nyttgallery = [...Images,uri ]
      setImage(nyttgallery);
      await AsyncStorage.setItem("Gallery", JSON.stringify(nyttgallery));
    }
  };
  const clearGallery = async () => {
    await AsyncStorage.removeItem("Gallery");
    setImage([])
  }
  //ef ekki þá birta val glugga
  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      <FlatList
        data={Images}
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
