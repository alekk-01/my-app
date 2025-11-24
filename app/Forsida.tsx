import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; //velja myndir
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View, } from "react-native";


//GERA TAGS FYRIR BUXUR OG SKÓ, Búa til index fyrir Shirts svo það sé possible að flippa í gegnum það

const Home = () => {

  const [shirts, setShirts] = useState<string[]>([]);
  const [hats, setHats] = useState<string[]>([]);
  const [pants, setPants] = useState<string[]>([]);
  const [shoes, setShoes] = useState<string[]>([]);

  const[mynd,setMynd] = useState<string | null>(null);
  const [modelWidth, setModelWidth] = useState(160);
  const [modelHeight, setModelHeight] = useState(400);


  const [shirtindex, setShirtIndex] = useState(0);
  const [hatindex, setHatIndex] = useState(0);
  const [pantsindex, setPantsIndex] = useState(0);
  const [shoeindex, setShoesIndex] = useState(0);
  const router = useRouter()

  const [hatPos, setHatPos] = useState({ x: 0, y: 0 });
  const [shirtPos, setShirtPos] = useState({ x: 0, y: 0 });
  const [pantsPos, setPantsPos] = useState({ x: 0, y: 0 });
  const [shoesPos, setShoesPos] = useState({ x: 0, y: 0 });

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
        const storedMynd = await AsyncStorage.getItem("Gallery_Mynd")
        if (storedMynd) {
          setMynd(storedMynd);
        }
      } catch(e) {
        Alert.alert("alert weeewoooweeewooo")
      }
    };
    loadAll();
  },[]);
const veljaMynd = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Permission needed!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    setMynd(uri);
    await AsyncStorage.setItem("Gallery_Mynd", uri);
  }
};

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

  const hatPan = React.useRef(new Animated.ValueXY()).current;

const hatResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event(
    [null, { dx: hatPan.x, dy: hatPan.y }],
    { useNativeDriver: false }
  ),
  onPanResponderRelease: () => {
    setHatPos({
      x: hatPos.x + hatPan.x._value,
      y: hatPos.y + hatPan.y._value,
    });
    hatPan.setValue({ x: 0, y: 0 });
  }
});

  const shirtPan = React.useRef(new Animated.ValueXY()).current;

const shirtResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event(
    [null, { dx: shirtPan.x, dy: shirtPan.y }],
    { useNativeDriver: false }
  ),
  onPanResponderRelease: () => {
    setShirtPos({
      x: shirtPos.x + shirtPan.x._value,
      y: shirtPos.y + shirtPan.y._value,
    });
    shirtPan.setValue({ x: 0, y: 0 });
  }
});
const pantsPan = React.useRef(new Animated.ValueXY()).current;

const pantsResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event(
    [null, { dx: pantsPan.x, dy: pantsPan.y }],
    { useNativeDriver: false }
  ),
  onPanResponderRelease: () => {
    setPantsPos({
      x: pantsPos.x + pantsPan.x._value,
      y: pantsPos.y + pantsPan.y._value,
    });
    pantsPan.setValue({ x: 0, y: 0 });
  }
});
const shoesPan = React.useRef(new Animated.ValueXY()).current;

const shoeResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event(
    [null, { dx: shoesPan.x, dy: shoesPan.y }],
    { useNativeDriver: false }
  ),
  onPanResponderRelease: () => {
    setShoesPos({
      x: shoesPos.x + shoesPan.x._value,
      y: shoesPos.y + shoesPan.y._value,
    });
    shoesPan.setValue({ x: 0, y: 0 });
  }
});
  return (

    <View style={styles.body}>
      <View style={styles.topRow}>
      <View style={styles.column}>
        <TouchableOpacity onPress={prevhat}>
            <Text style={styles.linkarrow}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevShirt}>
            <Text style={styles.linkarrow}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevPants}>
            <Text style={styles.linkarrow}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={prevShoes}>
              <Text style={styles.linkarrow}>←</Text>
        </TouchableOpacity>


      </View>
      

      <View style={styles.container}>
          <Image
            source={{ uri: mynd }}
            style={{ width: modelWidth, height: modelHeight }}
          />

          {hats.length > 0 && (
        <Animated.View
          {...hatResponder.panHandlers}
          style={{
          position: "absolute",
          left: hatPos.x,
          top: hatPos.y,
          transform: hatPan.getTranslateTransform(),
          }}
        >
        <Image
          source={{ uri: hats[hatindex] }}
          style={{ width: 75, height: 37 }}
        />
        </Animated.View>
      )}

          
          {shirts.length > 0 && (
            <Animated.View
    {...shirtResponder.panHandlers}
    style={{
      position: "absolute",
      left: shirtPos.x,
      top: shirtPos.y,
      transform: shirtPan.getTranslateTransform(),
      zIndex: 5
    }}
  >
    <Image
      source={{ uri: shirts[shirtindex] }}
      style={{ width: 150, height: 150, }}
    />
  </Animated.View>

          )}
          {pants.length > 0 && (
          <Animated.View
    {...pantsResponder.panHandlers}
    style={{
      position: "absolute",
      left: pantsPos.x,
      top: pantsPos.y,
      transform: pantsPan.getTranslateTransform(),
      zIndex: 4
    }}
  >
    <Image
      source={{ uri: pants[pantsindex] }}
      style={{ width: 200, height: 200 }}
    />
  </Animated.View>

          )}

          {shoes.length > 0 && (
          <Animated.View
    {...shoeResponder.panHandlers}
    style={{
      position: "absolute",
      left: shoesPos.x,
      top: shoesPos.y,
      transform: shoesPan.getTranslateTransform(),
    }}
  >
    <Image
      source={{ uri: shoes[shoeindex] }}
      style={{ width: 115, height: 75}}
    />
  </Animated.View>

          )}
      </View>

      <View style={styles.column}>
          <TouchableOpacity onPress={nextHat}>
              <Text style={styles.linkarrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={nextShirt}>
              <Text style={styles.linkarrow}>→</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={nextPants}>
              <Text style={styles.linkarrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextShoes}>
              <Text style={styles.linkarrow}>→</Text>
          </TouchableOpacity>




      </View> 
    </View>

        <View style={styles.bottomColumn}>
  <View style={styles.bottomBar}>
    <TouchableOpacity onPress={() => router.push("/Klefi")}>
      <Text style={styles.link}>Fataklefi</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={veljaMynd}>
      <Text style={styles.link}>Breyta um Módel</Text>
    </TouchableOpacity>
  </View>
  <View>
    <Text>Stærð á Módel</Text>
  </View>
  <View style={{ flexDirection: "row", gap: 10 }}>
  <TouchableOpacity   onPress={() => {
      setModelWidth(w => {
        const newWidth = Math.min(200,w + 5);
        setModelHeight(newWidth * 2.5);
        return newWidth;
      });
    }}
  >
    <Text style={styles.button}>Stærra</Text>
  </TouchableOpacity>


  <TouchableOpacity onPress={() => {
      setModelWidth(w => {
        const newWidth = Math.max(75, w - 5);
        setModelHeight(newWidth * 2.5);
        return newWidth;
      });
    }}
  >
    <Text style={styles.button}>Minna</Text>
  </TouchableOpacity>
</View>
     </View>
     </View>
  );
}

export default Home

const styles = StyleSheet.create({
  bottomBar:{
  position: "absolute",
  bottom: -155,
  left: 0,
  right: 0,
  height: 130,
  flexDirection: "column-reverse",
  alignItems: "center",
  paddingBottom: 10,
  margin: 10,
  justifyContent: "space-around",
  
  zIndex: 999,
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
  body: {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",  
  alignItems: "center",            
  paddingHorizontal: 20,          
},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "clear"
    

  },
  topRow: {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",

},
  link: {
  color: "white",
  backgroundColor: "black",
  padding: 10,
  textAlign: "center",
  borderRadius: 6,
  },
    linkarrow: {
  color: "white",
  backgroundColor: "black",
  padding: 10,
  textAlign: "center",
  borderRadius: 6,
  marginTop: 40
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
  bottomColumn: {
  position: "absolute",
  top: 520,
  width: "100%",
  height: 60,
  alignItems: "center",
},
    overlayImageSupp: {
    position: "absolute",
    top: 500,
    right: 45,
    height: 50,
    width: 130,
  }
})
